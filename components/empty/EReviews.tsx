"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowLeft, MessageSquareCode, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

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
        <Button onClick={() => router.back()}>
          <ArrowLeft /> Back
        </Button>
        <Button onClick={() => router.push("/products")} variant={"secondary"}>
          <ShoppingBasket />
          Products
        </Button>
      </EmptyContent>
    </Empty>
  );
}
