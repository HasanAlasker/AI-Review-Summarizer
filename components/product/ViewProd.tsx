import { Category, Product } from "@/lib/generated/prisma/client";
import { Flame, MessageCircleCode, PackageOpen } from "lucide-react";
import Link from "next/link";
import AddToCartBtn from "../cart/AddToCartBtn";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ProductCarousel } from "./Carosuel";

interface Props {
  id: string;
  product: Product & { category: Category };
  imageUrls: string[];
  runningLow?: boolean;
}

export default function ViewProd({
  id,
  product,
  imageUrls,
  runningLow,
}: Props) {
  return (
    <div className="flex flex-1 min-h-full w-full m-auto bg-background rounded-xl">
      <div className="flex flex-col flex-1 lg:flex-row gap-5 md:gap-10 lg:gap-20">
        <div className="w-full aspect-square max-w-lg rounded-lg flex justify-center items-center bg-[rgba(255,255,255,0.43)] backdrop-blur-sm dark:bg-[rgba(14,14,14,0.43)]">
          {imageUrls.length > 0 ? (
            <ProductCarousel
              images={imageUrls}
              alt={`image of ${product.name}`}
            />
          ) : (
            <PackageOpen
              width={"50%"}
              strokeWidth={1}
              className="text-border m-auto"
            />
          )}
        </div>
        <div className="flex flex-col justify-between gap-8 md:gap-15">
          <div className="flex flex-col gap-5 md:gap-10 h-full">
            <h2 className="text-2xl md:text-4xl text-left font-bold">
              {product?.name}
            </h2>
            <p className="text-md md:text-xl text-muted-foreground">
              {product?.description}
            </p>
            <p className="text-sm md:text-md text-muted-foreground">
              {product.category.name}
            </p>

            {product.stock > 0 ? (
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
                {runningLow && (
                  <Badge className="ml-2 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                    <Flame /> {product.stock} left
                  </Badge>
                )}
              </div>
            ) : (
              <p className="font-bold">Out of stock</p>
            )}

            <Link href={`/products/${id}/reviews`}>
              <Button variant={"outline"}>
                <MessageCircleCode data-icon={"inline-start"} />
                Read Reviews
              </Button>
            </Link>
          </div>
          <AddToCartBtn productId={id} outOfStock={product.stock === 0} />
        </div>
      </div>
    </div>
  );
}
