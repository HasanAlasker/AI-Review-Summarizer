import React from "react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/app/store/useCart";

interface Props {
  productId: string;
  quantity: number;
}

export default function Footer({ quantity, productId }: Props) {
  const removeItem = useCart((s) => s.removeItem);

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
          <Button variant={"outline"}>
            <Minus />
          </Button>
          <p>{quantity}</p>
          <Button variant={"outline"}>
            <Plus />
          </Button>
        </div>
      </div>
    </CardFooter>
  );
}
