import { Resend } from "resend";
import { OrderStatus } from "./generated/prisma/enums";

const resend = new Resend(process.env.RESEND_API_KEY);

export const EmailClient = {
  OrderStatusUpdate(
    reciverEmail: string,
    reciverName: string,
    status: OrderStatus,
  ) {
    resend.emails.send({
      from: "orders.alasker.dev",
      to: reciverEmail,
      subject:
        status === "PENDING" ? "Order confirmation" : "Order status update",
      react: "",
    });
  },
};
