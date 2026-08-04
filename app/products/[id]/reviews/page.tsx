import Grid from "@/components/general/Grid";
import Card from "@/components/review/Card";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const reviews = await prisma.review.findMany({ where: { productId: id } });

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

  return <Grid>{reviewList}</Grid>;
}
