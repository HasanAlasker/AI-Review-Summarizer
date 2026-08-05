"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

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
      const res = await axios.post(
        `/api/products/${productId}/reviews/summarize`,
      );
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size={"lg"}
      className="flex justify-center items-center text-lg self-start py-6 px-6"
      onClick={handleSummarization}
      disabled={loading}
    >
      {loading ? <Spinner /> : <Sparkles className="size-4.5" />}

      <p>{loading ? "Summarizing" : "Summarize"}</p>
    </Button>
  );
}
