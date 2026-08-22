"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowLeft, MessageSquareCode } from "lucide-react";
import { useRouter } from "next/navigation";
import RatingModal from "../review/Modal";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";

interface Props {
  productId: string;
}

export default function EReviews({ productId }: Props) {
  const router = useRouter();
  const { data } = useSession();
  const isAdmin = data?.user.role === "admin";

  return (
    <Empty className="bg-background border border-border rounded-2xl">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <MessageSquareCode />
        </EmptyMedia>
        <EmptyTitle>No Reviews</EmptyTitle>
        <EmptyDescription>This product has no reviews yet</EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row gap-4 justify-center items-center">
        {!isAdmin && <RatingModal productId={productId} />}
        <Button
          variant={!isAdmin ? "secondary" : "default"}
          onClick={() => router.back()}
        >
          <ArrowLeft /> Back
        </Button>
      </EmptyContent>
    </Empty>
  );
}
