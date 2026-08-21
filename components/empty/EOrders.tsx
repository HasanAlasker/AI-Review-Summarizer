"use client";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from "@/components/ui/empty";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  status: OrderStatus;
}

export default function EOrders({ status }: Props) {
  const statusWord = status[0] + status.slice(1).toLowerCase();

  const router = useRouter();
  return (
    <Empty className="bg-background border border-border rounded-2xl">
      <EmptyHeader>
        <EmptyMedia variant={"icon"}>
          <ShoppingCart />
        </EmptyMedia>
        <EmptyTitle>No {statusWord} Orders</EmptyTitle>
        <EmptyDescription>
          There aren't any {statusWord} orders at the momment, you can use
          status filter to switch.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
