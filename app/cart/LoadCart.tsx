"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCart } from "../store/useCart";

export default function LoadCart() {
  const hydrate = useCart((s) => s.hydrate);
  const hasHydrated = useCart((s) => s.hasHydrated);
  const reset = useCart((s) => s.reset);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && !hasHydrated) {
      hydrate();
    }
    if (status === "unauthenticated") {
      reset();
    }
  }, [status]);

  return null;
}
