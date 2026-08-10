import EProducts from "@/components/empty/EProducts";
import Grid from "@/components/general/Grid";
import Card from "@/components/product/Card";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export default async function page() {
  const products = await prisma.product.findMany({ include: { images: true } });

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
      <Grid>{ProductList}</Grid>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Products",
  description: "Browse products",
};
