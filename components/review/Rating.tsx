"use client";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function Rating() {
  const [rating, setRating] = useState(0);

  return (
    <div className="flex w-full gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          strokeWidth={1.2}
          size={38}
          onClick={() => setRating(index + 1)}
          className={`${rating > index ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}
