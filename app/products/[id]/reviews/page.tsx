import EReviews from "@/components/empty/EReviews";
import Grid from "@/components/general/Grid";
import Card from "@/components/review/Card";
import SummarySec from "@/components/summary/SummarySec";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const reviews = await prisma.review.findMany({
    where: { productId: id },
    include: { author: true },
  });

  const reviewList = reviews.map((r) => (
    <Card
      key={r.id}
      id={r.id}
      content={r.content}
      rating={r.rating}
      createdAt={r.createdAt}
      productId={id}
      isDeleted={r.isDeleted}
      author={r.author.name ?? "Reviewer"}
      authorId={r.authorId}
    />
  ));

  if (reviews.length === 0) return <EReviews />;

  return (
    <div className="flex flex-1 flex-col gap-10">
      <SummarySec id={id} />
      <Grid>{reviewList}</Grid>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Reviews",
  description: "Product Reviews",
};
