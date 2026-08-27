import CustomerInfo from "@/components/order/CustomerInfo";
import StatusSelect from "@/components/order/StatusDDL";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { serializeOrder } from "@/types/orderWithRel";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function page({ params }: Props) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: { include: { product: { include: { images: true } } } },
    },
  });

  if (!order) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.id.slice(0, 8)}</h1>
          <p className="text-sm text-muted-foreground">
            Placed {order.createdAt.toLocaleDateString()}
          </p>
        </div>
        <StatusSelect orderId={order.id} currentStatus={order.status} />
      </div>

      <CustomerInfo order={serializeOrder(order)} />

      <Card>
        <CardHeader>
          <CardTitle>Items</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {order.items.map((item) => {
            const cover = item.product.images.find((img) => img.isPrimary);
            return (
              <div key={item.id} className="flex items-center gap-4">
                {cover && (
                  <Image
                    src={cover.url}
                    alt={item.product.name}
                    width={56}
                    height={56}
                    className="aspect-square object-cover rounded-md"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity} × ${Number(item.price).toFixed(2)}
                  </p>
                </div>
                <p className="text-sm font-medium">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            );
          })}
          <Separator />
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>${Number(order.total).toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const dynamic = "force-dynamic";
