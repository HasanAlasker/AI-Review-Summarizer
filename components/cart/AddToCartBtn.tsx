"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/app/store/useCart";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
  outOfStock: boolean
}

export default function AddToCartBtn({ productId, outOfStock }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { status: userStatus, data: session } = useSession();
  const addItem = useCart((s) => s.addItem);

  const handleClick = async () => {
    if (userStatus === "loading") return;
    if (userStatus === "unauthenticated") {
      toast.info("Please signin first");
      router.replace("/api/auth/signin");
      return;
    }
    try {
      setLoading(true);
      await addItem(productId)
        .then(() => toast.success("Item added to cart!"))
        .catch(() => toast.error("Failed to add item, not enough stock"));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const admin = session?.user.role === "admin";

  return (
    <Button onClick={handleClick} disabled={admin || loading || outOfStock } className="py-6">
      {loading ? <Spinner /> : <ShoppingCart data-icon={"inline-start"} />}
      Add to cart
    </Button>
  );
}
