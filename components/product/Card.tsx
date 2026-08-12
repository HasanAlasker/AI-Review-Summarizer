import { Image as ImageModel, Product } from "@/lib/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
  Card as ShadCard,
} from "../ui/card";
import AdminOptions from "./AdminOptions";

interface Props extends Omit<Product, "price"> {
  images: ImageModel[];
  isAdmin: boolean;
  onDelete: (id: string) => void;
  price: number;
  category: string;
}

export default function Card({
  id,
  name,
  description,
  category,
  price,
  createdAt,
  images,
  isAdmin,
  onDelete,
}: Props) {
  const cover = images.find((image) => image.isPrimary === true);

  return (
    <ShadCard className="flex flex-col justify-between">
      <CardContent className="flex flex-col md:flex-row gap-5">
        {cover && (
          <Image
            src={cover.url}
            alt={`image of ${name}`}
            width={1200}
            height={1200}
            quality={100}
            className="aspect-square object-cover w-full max-w-xs self-center md:w-30 rounded-md"
          />
        )}
        <div className="flex flex-1 flex-col">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>

          <p className="mt-3">{category}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <p>{"$" + price}</p>
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
