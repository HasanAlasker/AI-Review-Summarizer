"use client";
import { Summary } from "@/lib/generated/prisma/client";
import { ReviewWithRelations } from "@/types/reviewWithRel";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import RatingModal from "../review/Modal";
import SkeletonCard from "./Skeleton";
import SumBtn from "./SumBtn";
import SummaryBox from "./Summary";

interface Props {
  id: string;
  serverSummary: Summary | null;
  setReviews?: Dispatch<SetStateAction<ReviewWithRelations[]>>;
}
export interface summaryResponse {
  summary: Summary | undefined;
}

export default function SummarySec({
  id: productId,
  serverSummary,
  setReviews,
}: Props) {
  const [summary, setSummary] = useState<Summary | null>(serverSummary);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    setSummary(serverSummary);
  }, [serverSummary]);

  const date = new Date();
  // to test when the summary is expired
  // date.setDate(date.getDate() + 11);
  const noSummary = !summary || date > new Date(summary.expiresAt);

  return (
    <div className="flex flex-col gap-10">
      {loading && <SkeletonCard />}
      <div className="flex justify-between">
        {noSummary && !loading && (
          <SumBtn
            productId={productId}
            loading={loading}
            setSummary={setSummary}
            setLoading={setLoading}
            setErr={setErr}
          />
        )}
        <RatingModal
          productId={productId}
          variant="outline"
          setReviews={setReviews}
        />
      </div>

      {summary && !loading && (
        <SummaryBox
          content={summary.content}
          createdAt={summary.createdAt}
          expiresAt={summary.expiresAt}
          id={summary.id}
          productId={productId}
        />
      )}
    </div>
  );
}
