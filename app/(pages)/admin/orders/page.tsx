import GridWithFilter from "@/components/order/GridWithFilter";
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
    <GridWithFilter orders={orders} statusFilter={statusFilter ?? "PENDING"} />
  );
}

export const dynamic = "force-dynamic";
