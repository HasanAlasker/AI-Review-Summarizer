import EProducts from "@/components/empty/EProducts";
import AdminActions from "@/components/product/AdminActions";
import ProductGrid from "@/components/product/ProductGrid";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ProductActions from "@/components/product/ProductActions";
import { Prisma } from "@/lib/generated/prisma/client";
import { lowStock } from "@/constants/lowStock";
interface Props {
  searchParams: Promise<{
    outOfStock?: string;
    category: string;
    price: string;
    discount: string;
    limited: string;
  }>;
}

export default async function page({ searchParams }: Props) {
  const { outOfStock, category, price, discount, limited } = await searchParams;
  const showOutOfStock = outOfStock === "true";
  const showLimited = limited === "true";
  const discounted = discount === "true";

  const where: Prisma.ProductWhereInput = {
    isDeleted: false,
  };

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

  const products = await prisma.product.findMany({
    where,
    orderBy:
      price === "asc"
        ? { price: "asc" }
        : price === "desc"
          ? { price: "desc" }
          : { createdAt: "desc" },
    include: { images: true, category: true },
  });

  const categories = await prisma.category.findMany();

  const session = await getServerSession(authOptions);
  const isAdmin = session?.user.role === "admin";

  if (products.length === 0) return <EProducts outOfStockOn={showOutOfStock} />;

  const plainProducts = products.map((p) => ({
    ...p,
    category: p.category.name,
    price: Number(p.price),
    discountPrice: Number(p.discountPrice),
  }));

  return (
    <div className="flex flex-col gap-5">
      {session?.user.role === "admin" && <AdminActions />}
      <ProductActions categories={categories} />
      <ProductGrid initialProducts={plainProducts} isAdmin={isAdmin} />
    </div>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse products",
};
