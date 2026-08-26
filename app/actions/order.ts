"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import {
  orderWithRelations,
  SerializedOrder,
  serializeOrder,
} from "@/types/orderWithRel";
import { EmailClient } from "@/lib/sendEmail";

type PlaceOrderResult =
  | { success: true; order: SerializedOrder }
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
        ...orderWithRelations,
      });

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return newOrder;
    });

    const result = { success: true as const, order: serializeOrder(order) };

    try {
      await EmailClient.OrderConfirmation(
        result.order,
        `${process.env.NEXTAUTH_URL}/orders/${result.order.id}`,
        // "https://matjr.alasker.dev/icon.png",
      );
    } catch (err) {
      console.error("Failed to send confirmation email:", err);
    }

    return result;
  } catch (error) {
    console.error("placeOrder failed:", error);
    const message =
      error instanceof Error ? error.message : "Failed to place order";
    return { success: false, message };
  }
};
