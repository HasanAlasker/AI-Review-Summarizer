import { OrderWithRelations } from "@/types/orderWithRel";
import Grid from "../general/Grid";
import Card from "./Card";

interface Props {
  orders: OrderWithRelations[];
}
export default function OrderGrid({ orders }: Props) {
  return (
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
  );
}
