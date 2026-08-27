"use server";
import { lowStock } from "@/constants/lowStock";
import { Prisma } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { productWithRelations } from "@/types/productWithRel";

export const getProducts = async (
  q: string,
  showOutOfStock: boolean,
  showLimited: boolean,
  discounted: boolean,
  category: string,
  price: string,
  page: string,
  pageSize: string,
) => {
  const where: Prisma.ProductWhereInput = {
    isDeleted: false,
  };
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  if (showOutOfStock) {
    where.stock = 0;
  } else if (showLimited) {
    where.stock = { gt: 0, lte: lowStock };
  } else {
    where.stock = { gt: 0 };
  }

  if (discounted) {
    where.discountPrice = { not: null };
  }
  if (category) {
    where.category = { name: { equals: category, mode: "insensitive" } };
  }

  const count = await prisma.product.count({ where });
  const products = await prisma.product.findMany({
    where,
    orderBy:
      price === "asc"
        ? { price: "asc" }
        : price === "desc"
          ? { price: "desc" }
          : { createdAt: "desc" },
    skip: (Number(page) - 1) * Number(pageSize ?? 10),
    take: Number(pageSize),
    ...productWithRelations,
  });

  return { count, products };
};
