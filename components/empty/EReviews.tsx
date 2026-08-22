"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  ArrowLeft,
  MessageSquareCode
} from "lucide-react";
import { useRouter } from "next/navigation";
import Modal from "../review/Modal";
import { Button } from "../ui/button";

export default function EReviews() {
  const router = useRouter();
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
        <Modal />
        <Button variant={"secondary"} onClick={() => router.back()}>
          <ArrowLeft /> Back
        </Button>
      </EmptyContent>
    </Empty>
  );
}
