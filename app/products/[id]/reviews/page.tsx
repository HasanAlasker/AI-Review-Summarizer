import Grid from "@/components/general/Grid";
import Card from "@/components/review/Card";
import SumBtn from "@/components/summary/SumBtn";
import Summary from "@/components/summary/Summary";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const reviews = await prisma.review.findMany({ where: { productId: id } });

  const summary = await prisma.summary.findFirst({ where: { productId: id } });
  const date = new Date();
  // to test when the summary is expired
  // date.setDate(date.getDate() + 11);
  const noSummary = !summary || date > summary.expiresAt;

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
      {noSummary && <SumBtn productId={id} />}
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
