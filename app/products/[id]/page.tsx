import EProduct from "@/components/empty/EProduct";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { MessageCircleCode, PackageOpen, ShoppingCart } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export const getProduct = cache(async (id: string) => {
  return prisma.product.findUnique({ where: { id } });
});

export default async function page({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) return <EProduct />;

  return (
    <div className="flex flex-1 min-h-full w-full m-auto">
      <div className="flex flex-col flex-1 md:flex-row gap-10 md:gap-10 lg:gap-20">
        <div className="w-full h-full aspect-square max-w-lg bg-white rounded-lg border border-border flex justify-center items-center">
          {product?.imageURL ? (
            <Image
              src={product?.imageURL}
              alt={`image of ${product.name}`}
              width={1500}
              height={1500}
              className="w-full aspect-square object-contain rounded-lg"
            ></Image>
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
            <p className="text-2xl font-medium">${product?.price.toString()}</p>
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  return {
    title: product?.name,
    description: product?.description,
  };
}
