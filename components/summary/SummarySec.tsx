"use client";
import { Summary } from "@/lib/generated/prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import RatingModal from "../review/Modal";
import SkeletonCard from "./Skeleton";
import SumBtn from "./SumBtn";
import SummaryBox from "./Summary";

interface Props {
  id: string;
}
export interface summaryResponse {
  summary: Summary | undefined;
}

export default function SummarySec({ id: productId }: Props) {
  const [summary, setSummary] = useState<Summary>();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchSummary = async () => {
    setLoading(false);
    setErr("");
    try {
      setLoading(true);
      const { data } = await axios.get<summaryResponse>(
        `/api/products/${productId}/reviews/summarize`,
      );
      console.log(data);
      if (data.summary) setSummary(data.summary);
    } catch (error) {
      console.log(error);
      setErr("Couldn't fetch summary");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const date = new Date();
  // to test when the summary is expired
  //   date.setDate(date.getDate() + 11);
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
        <RatingModal productId={productId} variant="outline" />
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
