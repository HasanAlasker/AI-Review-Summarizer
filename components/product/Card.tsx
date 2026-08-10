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

interface Props extends Product {
  images: ImageModel[];
}

export default function Card({
  id,
  name,
  description,
  price,
  createdAt,
  images,
}: Props) {
  const cover = images[0]?.url;
  return (
    <ShadCard className="flex flex-col justify-between">
      <CardContent className="flex flex-col md:flex-row gap-3">
        {cover && (
          <Image
            src={cover}
            alt={`image of ${name}`}
            width={1200}
            height={1200}
            quality={100}
            className="aspect-square object-contain w-full max-w-xs self-center md:w-30 rounded-md"
          />
        )}
        <div className="flex flex-1 flex-col">
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>

          <p className="mt-3">Stocked at: {createdAt.toLocaleDateString()}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between">
          <p>{"$" + price.toString()}</p>
          <Link href={`/products/${id}`}>
            <Button>Learn More</Button>
          </Link>
        </div>
      </CardFooter>
    </ShadCard>
  );
}
