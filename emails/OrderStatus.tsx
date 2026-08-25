import { OrderStatus } from "@/lib/generated/prisma/enums";
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface OrderStatusUpdateTemplateProps {
  recipientName: string;
  orderNumber: string;
  status: OrderStatus;
  statusDate: string; // e.g. "August 25, 2026"
  orderUrl: string;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  estimatedDelivery?: string; // e.g. "August 28, 2026"
  logoUrl?: string;
  supportEmail?: string;
}

const STATUS_COPY: Record<
  OrderStatus,
  {
    label: string;
    headline: string;
    message: string;
    color: string;
    bg: string;
  }
> = {
  PENDING: {
    label: "Pending",
    headline: "Your order is pending",
    message: "We've received your order and it's waiting to be processed.",
    color: "#92400e",
    bg: "#dcfce7",
  },
  PAID: {
    label: "Paid",
    headline: "Your order is paid",
    message: "Your order is paid off.",
    color: "#166534",
    bg: "#fef3c7",
  },
  SHIPPED: {
    label: "Shipped",
    headline: "Your order is on its way",
    message: "Your package has left our warehouse and is headed your way.",
    color: "#3730a3",
    bg: "#e0e7ff",
  },
  DELIVERED: {
    label: "Delivered",
    headline: "Your order has been delivered",
    message: "Your package was delivered. We hope you love it!",
    color: "#166534",
    bg: "#dcfce7",
  },
  CANCELLED: {
    label: "Cancelled",
    headline: "Your order has been cancelled",
    message:
      "Your order was cancelled. If you didn't request this, please contact us.",
    color: "#991b1b",
    bg: "#fee2e2",
  },
};

export default function OrderStatusUpdate({
  recipientName,
  orderNumber,
  status,
  logoUrl,
  supportEmail = "support@example.com",
}: OrderStatusUpdateTemplateProps) {
  const copy = STATUS_COPY[status];

  return (
    <Html>
      <Head />
      <Preview>
        Order #{orderNumber} update: {copy.label}
      </Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white mx-auto rounded-lg overflow-hidden max-w-150">
            {/* Header */}
            <Section className="bg-black px-8 py-6">
              {logoUrl ? (
                <Img src={logoUrl} alt="Logo" height="32" className="mb-1" />
              ) : (
                <Text className="text-white text-lg font-bold m-0">
                  Your Store
                </Text>
              )}
            </Section>

            {/* Status badge + headline */}
            <Section className="px-8 pt-8 pb-2">
              <table role="presentation" cellPadding={0} cellSpacing={0}>
                <tr>
                  <td
                    style={{
                      backgroundColor: copy.bg,
                      color: copy.color,
                      borderRadius: "9999px",
                      padding: "4px 12px",
                      fontSize: "12px",
                      fontWeight: 600,
                    }}
                  >
                    {copy.label}
                  </td>
                </tr>
              </table>
              <Heading className="text-2xl font-bold text-gray-900 mt-4 mb-2">
                {copy.headline}
              </Heading>
              <Text className="text-gray-600 text-sm m-0">
                Hi {recipientName}, {copy.message}
              </Text>
            </Section>

            {/* Order meta */}
            <Section className="px-8 pt-6 pb-4">
              <Row>
                <Column>
                  <Text className="text-xs uppercase tracking-wide text-gray-400 m-0">
                    Order number
                  </Text>
                  <Text className="text-sm font-medium text-gray-900 mt-1 m-0">
                    {orderNumber}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-gray-200 mx-8 w-auto" />

            {/* Footer */}
            <Section className="px-8 py-6">
              <Text className="text-xs text-gray-400 m-0 text-center">
                Questions about your order? Contact us at{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-gray-500 underline"
                >
                  {supportEmail}
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

OrderStatusUpdate.PreviewProps = {
  recipientName: "Jordan",
  orderNumber: "ORD-10457",
  status: "SHIPPED",
  statusDate: "August 25, 2026",
  orderUrl: "https://example.com/orders/ORD-10457",
  trackingNumber: "1Z999AA10123456784",
  trackingUrl: "https://example.com/track/1Z999AA10123456784",
  carrier: "UPS",
  estimatedDelivery: "August 28, 2026",
} satisfies OrderStatusUpdateTemplateProps;
