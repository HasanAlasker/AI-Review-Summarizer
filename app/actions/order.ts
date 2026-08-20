"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

type PlaceOrderResult =
  | { success: true; order: { id: string; total: number } }
  | { success: false; message: string };

export const placeOrder = async (): Promise<PlaceOrderResult> => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.user.phone || !session.user.street) {
    return { success: false, message: "Incomplete user info" };
  }

  const userId = session.user.id;

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: { select: { price: true, stock: true, name: true } },
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    return { success: false, message: "Cart is empty" };
  }

  const outOfStock = cart.items.filter(
    (item) => item.product.stock < item.quantity,
  );

  if (outOfStock.length > 0) {
    const names = outOfStock.map((item) => item.product.name).join(", ");
    return {
      success: false,
      message:
        outOfStock.length === 1
          ? `Not enough stock for ${names}`
          : `Not enough stock for: ${names}`,
    };
  }

  const total = cart.items.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0,
  );

  try {
    const order = await prisma.$transaction(async (tx) => {
      // Re-check inside the transaction too — stock could've changed
      // between the check above and now (race condition window)
      const failed: string[] = [];

      for (const item of cart.items) {
        const result = await tx.product.updateMany({
          where: { id: item.productId, stock: { gte: item.quantity } },
          data: { stock: { decrement: item.quantity } },
        });
        if (result.count === 0) {
          failed.push(item.product.name);
        }
      }

      if (failed.length > 0) {
        throw new Error(`Not enough stock for: ${failed.join(", ")}`);
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
              price: item.product.price,
            })),
          },
        },
        include: { items: true },
      });

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return newOrder;
    });

    return {
      success: true,
      order: { id: order.id, total: Number(order.total) },
    };
  } catch (error) {
    // Log the real error server-side (this DOES show up in your server logs / Vercel logs)
    console.error("placeOrder failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to place order";
    return { success: false, message };
  }
};
