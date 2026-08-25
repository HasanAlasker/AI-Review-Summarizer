import ProductForm from "@/components/form/ProductForm";
import { prisma } from "@/lib/prisma";

export default async function page() {
  const categories = await prisma.category.findMany();
    const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return <ProductForm categoryOptions={categoryOptions} />;
}
