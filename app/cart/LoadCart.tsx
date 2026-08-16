"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCartStore } from "../store/useCart";

export default function LoadCart() {
  const hydrate = useCartStore((s) => s.hydrate);
  const reset = useCartStore((s) => s.reset);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      hydrate();
    }
    if (status === "unauthenticated") {
      reset();
    }
  }, [status, hydrate]);

  return null;
}
