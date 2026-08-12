import EProduct from "@/components/empty/EProduct";
import { ProductCarousel } from "@/components/product/Carosuel";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { MessageCircleCode, PackageOpen, ShoppingCart } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
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

  return (
    <div className="flex flex-1 min-h-full w-full m-auto">
      <div className="flex flex-col flex-1 lg:flex-row gap-10 md:gap-10 lg:gap-20">
        <div className="w-full h-full aspect-square max-w-lg rounded-lg flex justify-center items-center bg-[rgba(255,255,255,0.43)] backdrop-blur-sm dark:bg-[rgba(14,14,14,0.43)]">
          {imageUrls.length > 0 ? (
            <ProductCarousel
              images={imageUrls}
              alt={`image of ${product.name}`}
            />
          ) : (
            <PackageOpen
              width={"50%"}
              strokeWidth={1}
              className="text-border h-full m-auto"
            />
          )}
        </div>
        <div className="flex flex-col justify-between gap-15">
          <div className="flex flex-col gap-10 h-full">
            <h2 className="text-4xl text-left font-bold">{product?.name}</h2>
            <p className="text-xl text-muted-foreground">
              {product?.description}
            </p>
            <p className="text-md text-muted-foreground">
              Category: {product.category.name}
            </p>

            <div className="flex gap-2 items-baseline">
              <p
                className={` ${product.discountPrice ? "text-lg text-muted-foreground line-through" : "text-2xl font-medium"}`}
              >
                ${Number(product?.price)}
              </p>
              {product.discountPrice && (
                <p className={`text-2xl font-bold`}>
                  ${Number(product?.discountPrice)}
                </p>
              )}
            </div>

            <Link href={`/products/${id}/reviews`}>
              <Button variant={"outline"}>
                <MessageCircleCode data-icon={"inline-start"} />
                Read Reviews
              </Button>
            </Link>
          </div>
          <Button className="py-6">
            <ShoppingCart data-icon={"inline-start"} />
            Add to cart
          </Button>
        </div>
      </div>
    </div>
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
