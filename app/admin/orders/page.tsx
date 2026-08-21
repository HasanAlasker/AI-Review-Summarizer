import OrderGrid from "@/components/order/OrderGrid";
import StatusFilter from "@/components/order/StatusFilter";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { orderWithRelations } from "@/types/orderWithRel";

interface Props {
  searchParams: Promise<{ status?: OrderStatus }>;
}

export default async function page({ searchParams }: Props) {
  const { status: statusFilter } = await searchParams;

  const orders = await prisma.order.findMany({
    where: { status: statusFilter ?? "PENDING" },
    ...orderWithRelations,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-5">
      <StatusFilter currentStatus={statusFilter ?? "PENDING"} />
      <OrderGrid orders={orders} />
    </div>
  );
}

export const dynamic = "force-dynamic";
