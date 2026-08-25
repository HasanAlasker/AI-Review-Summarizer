import ProductForm from "@/components/form/ProductForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: { images: true },
    }),
    prisma.category.findMany(),
  ]);

  if (!product) notFound();

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <ProductForm
      categoryOptions={categoryOptions}
      mode="edit"
      productId={product.id}
      initialData={{
        name: product.name,
        categoryId: product.categoryId,
        description: product.description!,
        price: Number(product.price),
        discountPrice: Number(product.discountPrice),
        stock: product.stock,
        images: product.images.map((img) => ({
          publicId: img.publicId,
          url: img.url,
          isPrimary: img.isPrimary,
        })),
      }}
    />
  );
}
