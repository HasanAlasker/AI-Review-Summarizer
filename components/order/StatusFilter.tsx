"use client";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  currentStatus: OrderStatus;
}

const statuses: OrderStatus[] = [
  "PENDING",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default function StatusSelect({ currentStatus }: Props) {
  const [status, setStatus] = useState(currentStatus);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = async (value: OrderStatus | null) => {
    if (!value) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("status", value);
    router.push(`${pathname}?${params}`);
    setStatus(value);
  };

  return (
    <Select value={status} onValueChange={handleChange}>
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
