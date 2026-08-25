import GridWithFilter from "@/components/order/GridWithFilter";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { orderWithRelations } from "@/types/orderWithRel";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

interface Props {
  searchParams: Promise<{ status?: OrderStatus }>;
}

export default async function page({ searchParams }: Props) {
  const { status: statusFilter } = await searchParams;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) return;

  const orders = await prisma.order.findMany({
    where: { userId, status: statusFilter ?? "PENDING" },
    orderBy: { createdAt: "desc" },
    ...orderWithRelations,
  });

  return (
    <GridWithFilter orders={orders} statusFilter={statusFilter ?? "PENDING"} />
  );
}
