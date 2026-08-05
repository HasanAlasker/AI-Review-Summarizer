import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { MessageCircleCode, PackageOpen, ShoppingCart } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}
export default async function page({ params }: Props) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  return (
    <div className="m-auto">
      <div className="flex flex-col md:flex-row gap-10 md:gap-10 lg:gap-20 ">
        <div className="w-full aspect-square max-w-lg bg-gray-50 rounded-lg border border-border">
          <PackageOpen
            width={"50%"}
            strokeWidth={1}
            className="text-border h-full m-auto"
          />
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
