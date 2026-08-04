import { Star } from "lucide-react";

interface Props {
  rating: number;
  max?: number;
}
export default function Stars({ rating, max = 5 }: Props) {
  return (
    <div className="flex">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
          size={16}
        />
      ))}
    </div>
  );
}
