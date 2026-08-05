"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import SkeletonCard from "./Skeleton";

interface Props {
  productId: string;
}
export default function SumBtn({ productId }: Props) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const router = useRouter();

  const handleSummarization = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/products/${productId}/reviews/summarize`);
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <Button
        size={"lg"}
        className="flex justify-center items-center text-lg self-start py-6 px-6"
        onClick={handleSummarization}
        disabled={loading}
      >
        {loading ? <Spinner /> : <Sparkles className="size-4.5" />}

        <p>{loading ? "Summarizing" : "Summarize"}</p>
      </Button>
      {loading && <SkeletonCard />}
    </div>
  );
}
