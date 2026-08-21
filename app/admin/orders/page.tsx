import Grid from "@/components/general/Grid";
import Card from "@/components/order/Card";
import { OrderStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

interface Props {
  searchParams: Promise<{ status?: OrderStatus }>;
}

export default async function page({ searchParams }: Props) {
  const { status: statusFilter } = await searchParams;

  const orders = await prisma.order.findMany({
    where: { status: statusFilter ?? "PENDING" },
    include: {
      items: {
        include: {
          product: { include: { images: { where: { isPrimary: true } } } },
        },
      },
      user: {
        select: {
          email: true,
          name: true,
          phone: true,
          street: true,
          id: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <Grid>
        {orders.map((o) => (
          <Card
            key={o.id}
            orderId={o.id}
            userName={o.user.name!}
            phone={o.user.phone!}
            street={o.user.street!}
            status={o.status}
            total={Number(o.total)}
            items={o.items.map((i) => ({
              ...i,
              price: Number(i.price),
              product: {
                ...i.product,
                price: Number(i.product.price),
                discountPrice: i.product.discountPrice
                  ? Number(i.product.discountPrice)
                  : null,
              },
            }))}
          />
        ))}
      </Grid>
    </div>
  );
}

export const dynamic = "force-dynamic";
