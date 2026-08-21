"use client";
import { useOrder } from "@/app/store/useOrder";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface Props {
  orderId: string;
  currentStatus: OrderStatus;
}

const statuses: OrderStatus[] = [
  "PENDING",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function StatusSelect({ orderId, currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = async (value: OrderStatus | null) => {
    if (!value) return;
    const newStatus = value as OrderStatus;
    const previous = status;
    setStatus(newStatus);
    setLoading(true);

    try {
      await useOrder.getState().updateStatus(orderId, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Failed to update status:", error);
      setStatus(previous);
      toast.error("Failed to update order status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select value={status} onValueChange={handleChange} disabled={loading}>
      <SelectTrigger className="w-45">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
