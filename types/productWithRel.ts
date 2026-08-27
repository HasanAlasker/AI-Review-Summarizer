import { Prisma, Product } from "@/lib/generated/prisma/client";

export const productWithRelations = {
  include: { category: true, images: true },
} satisfies Prisma.ProductDefaultArgs;

export type ProductWithRelations = Prisma.ProductGetPayload<
  typeof productWithRelations
>;

export const serializeProducts = (products: ProductWithRelations[]) => {
  return products.map((p) => ({
    ...p,
    category: p.category.name,
    price: Number(p.price),
    discountPrice: Number(p.discountPrice),
  }));
};
