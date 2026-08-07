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
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function EProduct() {
  const router = useRouter();
  return (
    <Empty className="bg-background border border-border rounded-2xl">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <MessageSquareCode />
        </EmptyMedia>
        <EmptyTitle>Product Not Found</EmptyTitle>
        <EmptyDescription>
          This product does not exist please make sure the URL is correct
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row gap-4 justify-center items-center">
        <Button onClick={() => router.push("/products")}>
          <ShoppingBasket />
          Products
        </Button>
      </EmptyContent>
    </Empty>
  );
}
