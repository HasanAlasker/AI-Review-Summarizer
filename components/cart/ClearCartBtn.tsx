import { ShoppingBasket } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { useCart } from "@/app/store/useCart";
import { Button } from "../ui/button";
import { useState } from "react";

export default function ClearCartBtn() {
  const clearCart = useCart((s) => s.clearCart);
  const [loading, setLoading] = useState(false);

  return (
    <Button onClick={clearCart} variant={"destructive"} disabled={loading} className="py-6">
      {loading ? <Spinner /> : <ShoppingBasket data-icon={"inline-start"} />}
      Clear cart
    </Button>
  );
}
