import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/app/store/useCart";
import { toast } from "sonner";

interface Props {
  productId: string;
  quantity: number;
  stock: number;
}

export default function Footer({ quantity, productId, stock }: Props) {
  const removeItem = useCart((s) => s.removeItem);
  const updateQuantity = useCart((s) => s.updateQuantity);

  // local optimistic count so rapid clicks feel instant, independent of prop lag
  const [localQty, setLocalQty] = useState(quantity);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // keep local in sync if the prop changes from elsewhere (e.g. another tab, cart sync)
  useEffect(() => {
    setLocalQty(quantity);
  }, [quantity]);

  const scheduleUpdate = (next: number) => {
    setLocalQty(next); // instant visual feedback
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateQuantity(productId, next).catch(() => {
        toast.error("Failed to update quantity");
        setLocalQty(quantity); // revert to last confirmed prop value
      });
    }, 400); // only the last click in a burst actually hits the network
  };

  const disableAdd = localQty >= stock;

  const handleAdd = () => scheduleUpdate(localQty + 1);
  const handleDec = () => {
    if (localQty > 1) scheduleUpdate(localQty - 1);
  };

  const handleRemove = async () => {
    try {
      await removeItem(productId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CardFooter>
      <div className="flex w-full justify-between">
        <Button variant={"destructive"} onClick={handleRemove}>
          <Trash2 />
        </Button>
        <div className="flex gap-2 items-center">
          <Button variant={"outline"} onClick={handleDec} disabled={localQty === 1}>
            <Minus />
          </Button>
          <p>{localQty}</p>
          <Button variant={"outline"} onClick={handleAdd} disabled={disableAdd}>
            <Plus />
          </Button>
        </div>
      </div>
    </CardFooter>
  );
}
