import EReviews from "@/components/empty/EReviews";
import ReviewGrid from "@/components/review/ReviewGrid";
import { prisma } from "@/lib/prisma";
import { reviewWithRelations } from "@/types/reviewWithRel";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;
  const reviews = await prisma.review.findMany({
    where: { productId: id },
    orderBy: { createdAt: "desc" },
    ...reviewWithRelations,
  });

  const summary = await prisma.summary.findUnique({ where: { productId: id } });

  if (reviews.length === 0) return <EReviews productId={id} />;

  return (
    <ReviewGrid productId={id} reviews={reviews} serverSummary={summary} />
  );
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Product Reviews",
};
