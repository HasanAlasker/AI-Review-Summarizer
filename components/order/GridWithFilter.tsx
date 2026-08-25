import { OrderStatus } from "@/lib/generated/prisma/enums";
import { OrderWithRelations } from "@/types/orderWithRel";
import EOrders from "../empty/EOrders";
import OrderGrid from "./OrderGrid";
import StatusFilter from "./StatusFilter";

interface Props {
  statusFilter: OrderStatus;
  orders: OrderWithRelations[];
}

export default function GridWithFilter({ statusFilter, orders }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <StatusFilter currentStatus={statusFilter ?? "PENDING"} />
      {orders.length > 0 ? (
        <OrderGrid orders={orders} />
      ) : (
        <EOrders status={statusFilter ?? "PENDING"} />
      )}
    </div>
  );
}
