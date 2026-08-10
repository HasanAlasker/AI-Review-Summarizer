import { Review } from "@/lib/generated/prisma/client";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card as ShadCard,
} from "../ui/card";
import Stars from "./Stars";

interface Props extends Review {
  author: string;
}

export default function Card({
  id,
  content,
  rating,
  productId,
  createdAt,
  author,
  authorId,
}: Props) {
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
