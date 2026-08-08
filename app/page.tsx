import RatingCards from "@/components/home/RatingCards";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const sampleReviews = [
  {
    rating: 3,
    text: "Great build quality, a bit pricey though.",
    user: "Omar S.",
  },
  {
    rating: 5,
    text: "Battery lasts way longer than I expected.",
    user: "Hasan A.",
  },
  {
    rating: 4,
    text: "Setup took two minutes, works flawlessly.",
    user: "Amer D.",
  },
];

export default function Home() {
  return (
    <div className="min-h-full flex flex-col gap-20 lg:flex-row justify-between w-full m-auto pt-10 lg:pt-20">
      <div className="flex flex-col text-center lg:text-start justify-center lg:items-start items-center flex-1">
        <span className="mb-4 flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground self-center lg:self-start lg:text-lg bg-background backdrop-blur-md shadow-sm shadow-black/20">
          <Sparkles className="text-[#0F766E] size-3 lg:size-5" />
          AI-powered review summaries
        </span>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          Ten reviews.
          <br />
          One clear answer.
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground lg:text-2xl lg:max-w-xl lg:mt-5">
          Instead of scrolling through pages of reviews, get the last ten
          distilled into a single, honest summary in seconds.
        </p>
        <Button className={"mt-5 lg:mt-10 lg:text-lg lg:py-6 lg:px-4"}>
          <Link scroll={false} href={"/products"}>View Products</Link>
          <ArrowRight className="lg:size-6" />
        </Button>
      </div>
      <div className="flex flex-col gap-4 text-center max-w-md m-auto lg:flex-2 lg:m-0">
        {sampleReviews.map((r, i) => (
          <RatingCards
            key={i}
            content={r.text}
            rating={r.rating}
            user={r.user}
          />
        ))}
        <ArrowDown className="self-center" />
        <Card className="border-[#0F766E] bg-[#d9fdfa3d] px-5 py-3 text-sm font-medium backdrop-blur-md shadow-sm shadow-black/20">
          <div className="flex gap-2 text-[#0F766E] justify-center items-center">
            <Sparkles size={18} />
            <p>AI Summary</p>
          </div>
          Customers love the battery life and easy setup, though a few mention
          the price.
        </Card>
      </div>
    </div>
  );
}
