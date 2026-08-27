import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Star } from "lucide-react";

interface Props {
  rating: number;
  content: string;
  user: string;
}

export default function RatingCards({ rating, content, user }: Props) {
  return (
    <Card className="[--card-spacing:--spacing(4)]">
      <CardHeader>
        <CardTitle className="flex gap-2 justify-center items-center">
          <p className="text-sm text-gray-600">{user}</p>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                size={18}
                key={i}
                className={
                  rating > i
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}
