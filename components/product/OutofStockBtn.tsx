"use client";
import { BrushCleaning } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function OutofStockBtn() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOutOfStock = searchParams.get("outOfStock") === "true";

  const toggle = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (isOutOfStock) {
      params.delete("outOfStock");
    } else {
      params.set("outOfStock", "true");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Button
      variant={isOutOfStock ? "default" : "outline"}
      onClick={toggle}
    >
      <BrushCleaning />
    </Button>
  );
}