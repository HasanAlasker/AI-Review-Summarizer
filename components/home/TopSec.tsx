import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function TopSec() {
  return (
    <div className="flex flex-col text-center lg:text-start justify-center lg:items-start items-center flex-1">
      <span className="mb-4 flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground self-center lg:self-start lg:text-lg bg-background backdrop-blur-md shadow-sm shadow-black/20">
        <Sparkles className="text-[#0F766E] dark:text-[#17978d] size-3 lg:size-5" />
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
        <Link href={"/products"}>View Products</Link>
        <ArrowRight className="lg:size-6" />
      </Button>
    </div>
  );
}
