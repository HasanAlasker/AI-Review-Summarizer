"use client";
import { useCart } from "@/app/store/useCart";
import { ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import Stepper from "./Stepper";

interface Props {
  productId: string;
  outOfStock: boolean;
  stock: number;
}

export default function AddToCartBtn({ productId, outOfStock, stock }: Props) {
  const getItem = useCart((s) => s.getItem);
  const item = useCart((s) => s.items.find((i) => i.productId === productId));
  const hasHydrated = useCart((s) => s.hasHydrated);
  const [loading, setLoading] = useState(false);
  const exists = !!item;
  const router = useRouter();

  const { status: userStatus, data: session } = useSession();
  const addItem = useCart((s) => s.addItem);
  const pathname = usePathname();

  const callbackUrl = encodeURIComponent(pathname);

  const handleClick = async () => {
    if (userStatus === "loading") return;
    if (userStatus === "unauthenticated") {
      toast.info("Please signin first");
      router.push(`/api/auth/signin?callbackUrl=${callbackUrl}`);
      return;
    }
    try {
      setLoading(true);
      await addItem(productId).catch(() => {
        toast.error("Failed to add item, not enough stock");
      });
    } catch (error) {
      toast.error("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const admin = session?.user.role === "admin";
  const loadBtn = loading || (session?.user.role === "user" && !hasHydrated);

  const Render = () => {
    return exists ? (
      <Stepper
        productId={productId}
        quantity={getItem(productId)?.quantity ?? 1}
        stock={stock}
        hideDelete
      />
    ) : (
      <Button
        onClick={handleClick}
        disabled={admin || outOfStock || loadBtn}
        className="py-6"
      >
        {loadBtn ? <Spinner /> : <ShoppingCart data-icon={"inline-start"} />}
        Add to cart
      </Button>
    );
  };

  return <Render />;
}
