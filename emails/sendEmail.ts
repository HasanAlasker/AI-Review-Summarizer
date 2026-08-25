import { Resend } from "resend";
import { OrderStatus } from "../lib/generated/prisma/enums";

const resend = new Resend(process.env.RESEND_API_KEY);

export const EmailClient = {
  OrderConfirmation(recipientEmail: string, recipientName: string) {
    resend.emails.send({
      from: "noreply@orders.alasker.dev",
      to: recipientEmail,
      subject: "Order confirmation",
      react: recipientName,
    });
  },

  OrderStatusUpdate(
    recipientEmail: string,
    recipientName: string,
    status: OrderStatus,
  ) {
    resend.emails.send({
      from: "orders.alasker.dev",
      to: recipientEmail,
      subject: "Order status update",
      react: "",
    });
  },
};
