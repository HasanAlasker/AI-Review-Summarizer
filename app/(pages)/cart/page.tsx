"use client";
import ECart from "@/components/empty/ECart";
import { useCart } from "../../store/useCart";
import Grid from "@/components/general/Grid";
import Card from "@/components/cart/Card";
import ClearCartBtn from "@/components/cart/ClearCartBtn";
import Loading from "./loading";
import CheckoutBtn from "@/components/cart/CheckoutBtn";
import { Metadata } from "next";

export default function page() {
  const items = useCart((s) => s.items);
  const hasHydrated = useCart((s) => s.hasHydrated);

  if (!hasHydrated) return <Loading />;
  if (items.length === 0) return <ECart />;
  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">
          Total: $ {useCart.getState().totalPrice().toFixed(2)}
        </h1>
        <CheckoutBtn />
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
      <div className="mt-5">
        <ClearCartBtn />
      </div>
    </div>
  );
}

