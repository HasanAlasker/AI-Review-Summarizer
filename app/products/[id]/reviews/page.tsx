import Grid from "@/components/general/Grid";
import Card from "@/components/review/Card";
import Summary from "@/components/review/Summary";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { Sparkles } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const reviews = await prisma.review.findMany({ where: { productId: id } });

  const summary = await prisma.summary.findFirst({ where: { productId: id } });

  const reviewList = reviews.map((r) => (
    <Card
      key={r.id}
      id={r.id}
      author={r.author}
      content={r.content}
      rating={r.rating}
      createdAt={r.createdAt}
      productId={id}
    />
  ));

  return (
    <div className="flex flex-col gap-10">
      {!summary && (
        <Button
          size={"lg"}
          className="flex justify-center items-center text-lg self-start py-6 px-6"
        >
          <Sparkles className="size-4.5" />
          <p>Summarize</p>
        </Button>
      )}
      {summary && (
        <Summary
          id={summary.id}
          productId={summary.productId}
          content={summary.content}
          createdAt={summary.createdAt}
          expiresAt={summary.expiresAt}
        />
      )}
      <Grid>{reviewList}</Grid>
    </div>
  );
}