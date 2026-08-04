import { Product, Review } from "@/lib/generated/prisma/client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card as ShadCard,
} from "../ui/card";
import Stars from "./Stars";

export default function Card({
  id,
  author,
  content,
  rating,
  productId,
  createdAt,
}: Review) {
  return (
    <ShadCard className="flex flex-col justify-between">
      <div>
        <CardHeader>
          <div className="flex gap-5 items-center">
            <CardTitle className="font-bold text-lg">{author}</CardTitle>
            <Stars rating={rating} />
          </div>
          <CardDescription>{content}</CardDescription>
        </CardHeader>
      </div>
      <CardContent>Reviewd at: {createdAt.toLocaleDateString()}</CardContent>
    </ShadCard>
  );
}
