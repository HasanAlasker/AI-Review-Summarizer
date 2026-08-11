import EProducts from "@/components/empty/EProducts";
import Grid from "@/components/general/Grid";
import AddBtn from "@/components/product/AddBtn";
import Card from "@/components/product/Card";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
  const products = await prisma.product.findMany({ include: { images: true } });
  const session = await getServerSession(authOptions);

  const ProductList = products.map((p) => (
    <Card
      key={p.id}
      id={p.id}
      categoryId={p.categoryId}
      name={p.name}
      description={p.description}
      price={p.price}
      createdAt={p.createdAt}
      isDeleted={p.isDeleted}
      stock={p.stock}
      images={p.images}
    />
  ));

  if (products.length === 0) return <EProducts />;

  return (
    <div>
      {session?.user.role === "admin" && <AddBtn />}
      <Grid>{ProductList}</Grid>
    </div>
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse products",
};
