"use client";
import { useOrder } from "@/app/store/useOrder";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function LoadOrders() {
  const { data, status } = useSession();
  const hydrate = useOrder((s) => s.hydrate);
  const reset = useOrder((s) => s.reset);
  const hasHydrated = useOrder((s) => s.hasHydrated);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "authenticated" && data.user.role === "admin") {
      if (!hasHydrated) hydrate();
    } else if (status === "unauthenticated") {
      reset();
    }
  }, [status, data, hasHydrated]);

  return null;
}
