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

interface OrderItem {
  name: string;
  quantity: number;
  price: number; // unit price, in the same currency as `currency`
  imageUrl?: string;
}

interface OrderConfirmationTemplateProps {
  recipientName: string;
  orderNumber: string;
  orderDate: string; // e.g. "August 25, 2026"
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  currency?: string; // e.g. "$", defaults to "$"
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  orderUrl: string;
  logoUrl?: string;
  supportEmail?: string;
}

const formatMoney = (amount: number, currency: string) =>
  `${currency}${amount.toFixed(2)}`;

export default function OrderConfirmation({
  recipientName,
  orderNumber,
  orderDate,
  items,
  subtotal,
  shipping,
  tax,
  total,
  currency = "$",
  shippingAddress,
  orderUrl,
  logoUrl,
  supportEmail = "support@example.com",
}: OrderConfirmationTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Your order #{orderNumber} has been confirmed</Preview>
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

            {/* Hero */}
            <Section className="px-8 pt-8 pb-4">
              <Heading className="text-2xl font-bold text-gray-900 m-0 mb-2">
                Thanks for your order, {recipientName}!
              </Heading>
              <Text className="text-gray-600 text-sm m-0">
                We've received your order and we're getting it ready. You'll get
                another email as soon as it ships.
              </Text>
            </Section>

            {/* Order meta */}
            <Section className="px-8 pb-4">
              <Row>
                <Column>
                  <Text className="text-xs uppercase tracking-wide text-gray-400 m-0">
                    Order number
                  </Text>
                  <Text className="text-sm font-medium text-gray-900 mt-1 m-0">
                    {orderNumber}
                  </Text>
                </Column>
                <Column>
                  <Text className="text-xs uppercase tracking-wide text-gray-400 m-0">
                    Order date
                  </Text>
                  <Text className="text-sm font-medium text-gray-900 mt-1 m-0">
                    {orderDate}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-gray-200 mx-8 w-auto" />

            {/* Items */}
            <Section className="px-8 py-4">
              {items.map((item, idx) => (
                <Row key={idx} className="mb-4">
                  <Column className="w-16 align-top">
                    {item.imageUrl ? (
                      <Img
                        src={item.imageUrl}
                        alt={item.name}
                        width="56"
                        height="56"
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-100 rounded-md" />
                    )}
                  </Column>
                  <Column className="align-top pl-3">
                    <Text className="text-sm font-medium text-gray-900 m-0">
                      {item.name}
                    </Text>
                    <Text className="text-xs text-gray-500 m-0 mt-1">
                      Qty {item.quantity}
                    </Text>
                  </Column>
                  <Column className="align-top text-right">
                    <Text className="text-sm font-medium text-gray-900 m-0">
                      {formatMoney(item.price * item.quantity, currency)}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Section>

            <Hr className="border-gray-200 mx-8 w-auto" />

            {/* Totals */}
            <Section className="px-8 py-4">
              <Row className="mb-1">
                <Column>
                  <Text className="text-sm text-gray-500 m-0">Subtotal</Text>
                </Column>
                <Column className="text-right">
                  <Text className="text-sm text-gray-700 m-0">
                    {formatMoney(subtotal, currency)}
                  </Text>
                </Column>
              </Row>
              <Row className="mb-1">
                <Column>
                  <Text className="text-sm text-gray-500 m-0">Shipping</Text>
                </Column>
                <Column className="text-right">
                  <Text className="text-sm text-gray-700 m-0">
                    {formatMoney(shipping, currency)}
                  </Text>
                </Column>
              </Row>
              <Row className="mb-2">
                <Column>
                  <Text className="text-sm text-gray-500 m-0">Tax</Text>
                </Column>
                <Column className="text-right">
                  <Text className="text-sm text-gray-700 m-0">
                    {formatMoney(tax, currency)}
                  </Text>
                </Column>
              </Row>
              <Hr className="border-gray-200 w-auto my-2" />
              <Row>
                <Column>
                  <Text className="text-base font-bold text-gray-900 m-0">
                    Total
                  </Text>
                </Column>
                <Column className="text-right">
                  <Text className="text-base font-bold text-gray-900 m-0">
                    {formatMoney(total, currency)}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Shipping address */}
            <Section className="px-8 py-4">
              <Text className="text-xs uppercase tracking-wide text-gray-400 m-0 mb-2">
                Shipping to
              </Text>
              <Text className="text-sm text-gray-700 m-0 leading-6">
                {shippingAddress.name}
                <br />
                {shippingAddress.line1}
                {shippingAddress.line2 ? (
                  <>
                    <br />
                    {shippingAddress.line2}
                  </>
                ) : null}
                <br />
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.postalCode}
                <br />
                {shippingAddress.country}
              </Text>
            </Section>

            {/* CTA */}
            <Section className="px-8 py-6 text-center">
              <Button
                href={orderUrl}
                className="bg-black text-white text-sm font-medium px-6 py-3 rounded-md box-border"
              >
                View your order
              </Button>
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

OrderConfirmation.PreviewProps = {
  recipientName: "Jordan",
  orderNumber: "ORD-10457",
  orderDate: "August 25, 2026",
  items: [
    { name: "Wireless Headphones", quantity: 1, price: 89.99 },
    { name: "USB-C Charging Cable", quantity: 2, price: 12.5 },
  ],
  subtotal: 114.99,
  shipping: 5.0,
  tax: 9.6,
  total: 129.59,
  shippingAddress: {
    name: "Jordan Lee",
    line1: "123 Market Street",
    city: "San Francisco",
    state: "CA",
    postalCode: "94103",
    country: "United States",
  },
  orderUrl: "https://example.com/orders/ORD-10457",
} satisfies OrderConfirmationTemplateProps;
