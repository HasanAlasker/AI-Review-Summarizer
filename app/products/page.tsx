import EProducts from "@/components/empty/EProducts";
import Grid from "@/components/general/Grid";
import Card from "@/components/product/Card";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AddBtn from "@/components/product/AddBtn";

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

export const metadata: Metadata = {
  title: "Products",
  description: "Browse products",
};
