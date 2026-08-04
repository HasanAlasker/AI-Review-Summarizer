import React from "react";
import {
  Card as ShadCard,
  CardAction,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Product } from "@/lib/generated/prisma/client";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Card({
  id,
  name,
  description,
  price,
  createdAt,
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
