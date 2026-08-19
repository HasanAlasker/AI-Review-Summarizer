"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export const placeOrder = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.user.phone || !session.user.street) {
    throw new Error("Incomplete user info");
  }

  const userId = session.user.id;

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: { id: true, price: true, stock: true, name: true },
          },
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // Verify stock up front (fast fail before hitting the DB transaction)
  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      throw new Error(`Not enough stock for ${item.product.name}`);
    }
  }

  const total = cart.items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  try {
    const order = await prisma.$transaction(async (tx) => {
      // Atomically decrement stock — updateMany with a `gte` guard prevents
      // overselling under concurrent requests. If it doesn't match, someone
      // else beat us to the last units.
      for (const item of cart.items) {
        const result = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });

        if (result.count === 0) {
          throw new Error(`Not enough stock for ${item.product.name}`);
        }
      }

      const newOrder = await tx.order.create({
        data: {
          userId,
          total,
          status: "PENDING",
          items: {
            create: cart.items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price, // snapshot price at time of order
            })),
          },
        },
        include: { items: true },
      });

      // Clear the cart
      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return newOrder;
    });

    return {
      ...order,
      total: Number(order.total),
      items: order.items.map((item) => ({
        ...item,
        price: Number(item.price),
      })),
    };
  } catch (error) {
    console.error("placeOrder failed:", error);
    throw error instanceof Error ? error : new Error("Failed to place order");
  }
};
