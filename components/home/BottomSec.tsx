import { sampleReviews } from "@/app/constants/sampleReviews";
import { ArrowDown, Sparkles } from "lucide-react";
import { Card } from "../ui/card";
import RatingCards from "./RatingCards";

export default function BottomSec() {
  return (
    <div className="flex flex-col gap-4 text-center max-w-md m-auto lg:flex-2 lg:m-0">
      {sampleReviews.map((r, i) => (
        <RatingCards key={i} content={r.text} rating={r.rating} user={r.user} />
      ))}
      <ArrowDown className="self-center" />
      <Card className="border-[#0F766E] bg-[#d9fdfa3d] dark:bg-accent px-5 py-3 text-sm font-medium backdrop-blur-md shadow-sm shadow-black/20 [--card-spacing:--spacing(4)]">
        <div className="flex gap-2 text-[#0F766E] dark:text-[#17978d] justify-center items-center">
          <Sparkles size={18} />
          <p>AI Summary</p>
        </div>
        Customers love the battery life and easy setup, though a few mention the
        price.
      </Card>
    </div>
  );
}
