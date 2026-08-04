import Grid from "@/components/general/Grid";
import Card from "@/components/product/Card";
import { prisma } from "@/lib/prisma";

export default async function page() {
  const products = await prisma.product.findMany();

  const ProductList = products.map((p) => (
    <Card
      key={p.id}
      id={p.id}
      name={p.name}
      description={p.description}
      price={p.price}
      createdAt={p.createdAt}
    />
  ));

  return (
    <div>
      <Grid>{ProductList}</Grid>
    </div>
  );
}
