"use client";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ShoppingBasket, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function ECart() {
  const router = useRouter();
  return (
    <Empty className="bg-background border border-border rounded-2xl">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <ShoppingCart />
        </EmptyMedia>
        <EmptyTitle>Cart is empty</EmptyTitle>
        <EmptyDescription>
          Your cart doesn't have any items in it
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row gap-4 justify-center items-center">
        <Button onClick={() => router.push("/products")}>
          <ShoppingBasket />
          Continue Shopping
        </Button>
      </EmptyContent>
    </Empty>
  );
}
