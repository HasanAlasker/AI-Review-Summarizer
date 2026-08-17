"use client";
import ECart from "@/components/empty/ECart";
import { useCart } from "../store/useCart";

export default function page() {
  const items = useCart((s) => s.items);

  if (items.length === 0) return <ECart />;
  return (
    <div>
      {items.map((i) => (
        <h1 key={i.productId}>
          {i.product.name} {i.quantity.toString()}
        </h1>
      ))}
    </div>
  );
}
