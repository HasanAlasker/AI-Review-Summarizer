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
      <div>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>Stocked at: {createdAt.toLocaleDateString()}</CardContent>
      </div>
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
