"use client";
import { useEffect, useState } from "react";
import Grid from "../general/Grid";
import { ReviewWithRelations } from "@/types/reviewWithRel";
import Card from "./Card";
import SummarySec from "../summary/SummarySec";

interface Props {
  productId: string;
  reviews: ReviewWithRelations[];
}

export default function ReviewGrid({ productId, reviews }: Props) {
  const [reviewList, setReviews] = useState(reviews);

  useEffect(() => {
    setReviews(reviews);
  }, [reviews]);

  return (
    <div className="flex flex-1 flex-col gap-10">
      <SummarySec id={productId} setReviews={setReviews} />
      <Grid>
        {reviewList.map((r) => (
          <Card
            key={r.id}
            id={r.id}
            content={r.content}
            rating={r.rating}
            createdAt={r.createdAt}
            productId={productId}
            isDeleted={r.isDeleted}
            author={r.author.name ?? "Reviewer"}
            authorId={r.authorId}
          />
        ))}
      </Grid>
    </div>
  );
}
