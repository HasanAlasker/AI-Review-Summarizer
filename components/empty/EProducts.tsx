"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Archive, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function EProducts() {
  const router = useRouter();
  return (
    <Empty className="bg-background border border-border rounded-2xl">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <Archive />
        </EmptyMedia>
        <EmptyTitle>No Products</EmptyTitle>
        <EmptyDescription>
          We currently have no products in stock to display, please try again
          later!
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row gap-4 justify-center items-center">
        <Button onClick={() => router.push("/")}>
          <Home />
          Home
        </Button>
      </EmptyContent>
    </Empty>
  );
}
