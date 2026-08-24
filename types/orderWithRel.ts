// lib/queries/order.ts
import { Prisma } from "@/lib/generated/prisma/client";

export const orderWithRelations = {
  include: {
    items: {
      include: {
        product: { include: { images: { where: { isPrimary: true } } } },
      },
    },
    user: {
      select: {
        email: true,
        name: true,
        phone: true,
        street: true,
        id: true,
      },
    },
  },
} satisfies Prisma.OrderDefaultArgs;

export type OrderWithRelations = Prisma.OrderGetPayload<typeof orderWithRelations>;

// Client-safe version: Decimal fields converted to number
export type SerializedOrder = Omit<OrderWithRelations, "total" | "items"> & {
  total: number;
  items: (Omit<OrderWithRelations["items"][number], "price" | "discountPrice" | "product"> & {
    price: number;
    product: Omit<OrderWithRelations["items"][number]["product"], "price" | "discountPrice"> & {
      price: number;
      discountPrice: number | null;
    };
  })[];
};

export function serializeOrder(order: OrderWithRelations): SerializedOrder {
  return {
    ...order,
    total: Number(order.total),
    items: order.items.map((item) => ({
      ...item,
      price: Number(item.price),
      product: {
        ...item.product,
        price: Number(item.product.price),
        discountPrice: item.product.discountPrice
          ? Number(item.product.discountPrice)
          : null,
      },
    })),
  };
}