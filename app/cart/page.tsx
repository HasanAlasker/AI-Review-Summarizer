"use client";
import ECart from "@/components/empty/ECart";
import { useCart } from "../store/useCart";
import Grid from "@/components/general/Grid";
import Card from "@/components/cart/Card";
import ClearCartBtn from "@/components/cart/ClearCartBtn";

export default function page() {
  const items = useCart((s) => s.items);

  if (items.length === 0) return <ECart />;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full items-center justify-between">
        <h1>Total: $ {useCart.getState().totalPrice().toFixed(2)}</h1>
        <ClearCartBtn />
      </div>
      <Grid>
        {items.map((i) => (
          <Card
            key={i.productId}
            id={i.id}
            productId={i.productId}
            quantity={i.quantity}
            product={i.product}
          />
        ))}
      </Grid>
    </div>
  );
}
