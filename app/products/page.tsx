import EProducts from "@/components/empty/EProducts";
import AdminActions from "@/components/product/AdminActions";
import ProductGrid from "@/components/product/ProductGrid";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface Props {
  searchParams: Promise<{ outOfStock?: string }>;
}

export default async function page({ searchParams }: Props) {
  const { outOfStock } = await searchParams;
  const showOutOfStock = outOfStock === "true";

  const products = await prisma.product.findMany({
    where: { isDeleted: false, stock: showOutOfStock ? 0 : { gt: 0 } },
    orderBy: { createdAt: "desc" },
    include: { images: true, category: true },
  });
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
    <div>
      {session?.user.role === "admin" && <AdminActions />}
      <ProductGrid initialProducts={plainProducts} isAdmin={isAdmin} />
    </div>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse products",
};
