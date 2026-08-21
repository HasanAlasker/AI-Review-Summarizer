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