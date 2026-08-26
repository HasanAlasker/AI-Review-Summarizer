import { Resend } from "resend";
import OrderConfirmationTemp from "../emails/OrderConfirmation";
import { SerializedOrder } from "@/types/orderWithRel";
import OrderStatusUpdate from "../emails/OrderStatus";

const resend = new Resend(process.env.RESEND_API_KEY);

export const EmailClient = {
  OrderConfirmation(
    order: SerializedOrder,
    orderUrl: string,
    logoUrl?: string,
  ) {
    return resend.emails.send({
      from: "noreply@orders.alasker.dev",
      to: order.user.email!,
      subject: "Order confirmation",
      react: (
        <OrderConfirmationTemp
          order={order}
          orderUrl={orderUrl}
          logoUrl={logoUrl}
        />
      ),
    });
  },

  OrderStatusUpdate(
    order: SerializedOrder,
    tracking?: {
      statusDate?: string;
      trackingNumber?: string;
      trackingUrl?: string;
      carrier?: string;
      estimatedDelivery?: string;
    },
    logoUrl?: string,
  ) {
    return resend.emails.send({
      from: "noreply@orders.alasker.dev",
      to: order.user.email!,
      subject: "Order status update",
      react: (
        <OrderStatusUpdate order={order} {...tracking} logoUrl={logoUrl} />
      ),
    });
  },
};
