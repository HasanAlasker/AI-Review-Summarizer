import EProduct from "@/components/empty/EProduct";
import ViewProd from "@/components/product/ViewProd";
import { lowStock } from "@/constants/lowStock";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { cache } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export const getProduct = cache(async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: { images: true, category: true },
  });
});

export default async function page({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return <EProduct />;

  const orderedImages = [...product.images].sort(
    (a, b) => Number(b.isPrimary) - Number(a.isPrimary),
  );
  const imageUrls = orderedImages.map((image) => image.url);
  const showRunningLow = product.stock > 0 && product.stock <= lowStock;

  return (
    <ViewProd
      id={id}
      product={product}
      runningLow={showRunningLow}
      imageUrls={imageUrls}
    />
  );
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product?.name,
    description: product?.description,
  };
}
