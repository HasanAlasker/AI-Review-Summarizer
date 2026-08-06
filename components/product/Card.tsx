import { Product } from "@/lib/generated/prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as ShadCard,
} from "../ui/card";
import Image from "next/image";

export default function Card({
  id,
  name,
  description,
  price,
  createdAt,
  imageURL,
}: Product) {
  return (
    <ShadCard className="flex flex-col justify-between">
      <CardContent className="flex flex-col md:flex-row gap-2">
        {imageURL && (
          <Image
            src={imageURL}
            alt={`image of ${name}`}
            width={100}
            height={100}
            className="aspect-square object-contain w-full max-w-xs self-center md:w-30"
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
          <Button>
            <Link href={`/products/${id}`}>Learn More</Link>
          </Button>
        </div>
      </CardFooter>
    </ShadCard>
  );
}
