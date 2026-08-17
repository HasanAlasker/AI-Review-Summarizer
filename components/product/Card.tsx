import { lowStock } from "@/constants/lowStock";
import { Image as ImageModel, Product } from "@/lib/generated/prisma/client";
import { Flame, Percent } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  Card as ShadCard
} from "../ui/card";
import AdminOptions from "./AdminOptions";

interface Props extends Omit<Product, "price" | "discountPrice"> {
  images: ImageModel[];
  isAdmin: boolean;
  onDelete: (id: string) => void;
  price: number;
  discountPrice: number;
  category: string;
}

export default function Card({
  id,
  name,
  description,
  category,
  price,
  stock,
  discountPrice,
  createdAt,
  images,
  isAdmin,
  onDelete,
}: Props) {
  const cover = images.find((image) => image.isPrimary === true);

  // lowStock is a contant
  const showRunningLow = stock > 0 && stock <= lowStock;

  return (
    <ShadCard className="flex flex-col justify-between">
      <CardContent className="flex flex-col md:flex-row gap-5">
        {cover && (
          <Link href={`/products/${id}`}>
            <Image
              src={cover.url}
              alt={`image of ${name}`}
              width={1200}
              height={1200}
              quality={100}
              className="aspect-square object-cover w-full max-w-xs self-center md:w-30 rounded-md"
            />
          </Link>
        )}
        <div className="flex flex-1 flex-col">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <div className="flex gap-2">
            {discountPrice > 0 && (
              <Badge variant={"destructive"} className="mt-2">
                <Percent /> Save
              </Badge>
            )}
            {showRunningLow && (
              <Badge className="mt-2 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                <Flame /> {stock} left
              </Badge>
            )}
          </div>
          <p className="mt-3">{category}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <div className="flex-col gap-3">
            <p
              className={`${discountPrice && "line-through text-muted-foreground text-xs"}`}
            >
              {"$" + price}
            </p>
            {discountPrice > 0 && (
              <p className="font-bold">{"$" + discountPrice}</p>
            )}
          </div>
          {isAdmin ? (
            <AdminOptions productId={id} onDelete={onDelete} />
          ) : (
            <Link href={`/products/${id}`}>
              <Button>Learn More</Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </ShadCard>
  );
}
