"use client";
import { SerializedOrder } from "@/types/orderWithRel";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  order: SerializedOrder;
}
export default function CustomerInfo({ order }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(order?.user.phone!);
    toast.success("Customer phone number copied to clipboard!");
    setTimeout(() => {
      setCopied(false);
    }, 400);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer</CardTitle>
        <CardAction>
          <Button onClick={handleCopy} variant={"ghost"}>
            {!copied ? <Clipboard /> : <Check />}
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-1 text-sm">
        <p>{order.user.name}</p>
        <p className="text-muted-foreground">{order.user.email}</p>
        {order.user.phone && (
          <p className="text-muted-foreground">{order.user.phone}</p>
        )}
        {order.user.street && (
          <p className="text-muted-foreground">{order.user.street}</p>
        )}
      </CardContent>
    </Card>
  );
}
