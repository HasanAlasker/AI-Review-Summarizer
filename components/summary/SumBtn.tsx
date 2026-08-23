"use client";
import { Button } from "@/components/ui/button";
import { Summary } from "@/lib/generated/prisma/client";
import axios from "axios";
import { Sparkles } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Spinner } from "../ui/spinner";
import { summaryResponse } from "./SummarySec";

interface Props {
  productId: string;
  loading: boolean;
  setSummary: Dispatch<SetStateAction<Summary | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setErr: Dispatch<SetStateAction<string>>;
}
export default function SumBtn({
  productId,
  loading,
  setSummary,
  setLoading,
  setErr,
}: Props) {
  const handleSummarization = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post<summaryResponse>(
        `/api/products/${productId}/reviews/summarize`,
      );
      if (data.summary) setSummary(data.summary);
    } catch (error) {
      console.log(error);
      setErr("Couldn't summarize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="flex justify-center items-center self-start"
      onClick={handleSummarization}
      disabled={loading}
    >
      {loading ? <Spinner /> : <Sparkles />}

      <p>{loading ? "Summarizing" : "Summarize"}</p>
    </Button>
  );
}
