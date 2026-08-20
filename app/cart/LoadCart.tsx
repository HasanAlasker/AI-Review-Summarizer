"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCart } from "../store/useCart";

export default function LoadCart() {
  const hydrate = useCart((s) => s.hydrate);
  const hasHydrated = useCart((s) => s.hasHydrated);
  const reset = useCart((s) => s.reset);
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (
      status === "authenticated" &&
      data.user.role === "user" &&
      !hasHydrated
    ) {
      hydrate();
    } else if (status === "unauthenticated") {
      reset();
    }
  }, [status, data, hasHydrated]);

  return null;
}
