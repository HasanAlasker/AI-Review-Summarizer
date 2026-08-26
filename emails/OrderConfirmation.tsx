import { SerializedOrder } from "@/types/orderWithRel";
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

interface OrderConfirmationTemplateProps {
  order: SerializedOrder;
  orderUrl: string;
  currency?: string;
  logoUrl?: string;
  supportEmail?: string;
}

const formatMoney = (amount: number, currency: string) =>
  `${currency}${amount.toFixed(2)}`;

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function OrderConfirmation({
  order,
  orderUrl,
  currency = "$",
  logoUrl,
  supportEmail = "support@example.com",
}: OrderConfirmationTemplateProps) {
  const { user } = order;

  return (
    <Html>
      <Head />
      <Preview>Your order #{order.id} has been confirmed</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-10">
          <Container className="bg-white mx-auto rounded-lg overflow-hidden max-w-150">
            <Section className="bg-black px-8 py-6">
              {logoUrl ? (
                <Img src={logoUrl} alt="Logo" height="32" className="mb-1" />
              ) : (
                <Text className="text-white text-lg font-bold m-0">
                  Your Store
                </Text>
              )}
            </Section>

            <Section className="px-8 pt-8 pb-4">
              <Heading className="text-2xl font-bold text-gray-900 m-0 mb-2">
                Thanks for your order, {user.name}!
              </Heading>
              <Text className="text-gray-600 text-sm m-0">
                We've received your order and we're getting it ready. You'll get
                another email as soon as it ships.
              </Text>
            </Section>

            <Section className="px-8 pb-4">
              <Row>
                <Column>
                  <Text className="text-xs uppercase tracking-wide text-gray-400 m-0">
                    Order ID
                  </Text>
                  <Text className="text-sm font-medium text-gray-900 mt-1 m-0">
                    {order.id}
                  </Text>
                </Column>
                <Column>
                  <Text className="text-xs uppercase tracking-wide text-gray-400 m-0">
                    Order date
                  </Text>
                  <Text className="text-sm font-medium text-gray-900 mt-1 m-0">
                    {formatDate(order.createdAt)}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="border-gray-200 mx-8 w-auto" />

            <Section className="px-8 py-4">
              {order.items.map((item) => {
                const imageUrl = item.product.images[0]?.url;
                return (
                  <Row key={item.id} className="mb-4">
                    <Column className="w-16 align-top">
                      {imageUrl ? (
                        <Img
                          src={imageUrl}
                          alt={item.product.name}
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
                        {item.product.name}
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
                );
              })}
            </Section>

            <Hr className="border-gray-200 mx-8 w-auto" />

            <Section className="px-8 py-4">
              <Row>
                <Column>
                  <Text className="text-base font-bold text-gray-900 m-0">
                    Total
                  </Text>
                </Column>
                <Column className="text-right">
                  <Text className="text-base font-bold text-gray-900 m-0">
                    {formatMoney(order.total, currency)}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section className="px-8 py-4">
              <Text className="text-xs uppercase tracking-wide text-gray-400 m-0 mb-2">
                Shipping to
              </Text>
              <Text className="text-sm text-gray-700 m-0 leading-6">
                {user.name}
                <br />
                {user.street}
                {user.phone ? (
                  <>
                    <br />
                    {user.phone}
                  </>
                ) : null}
              </Text>
            </Section>

            <Section className="px-8 py-6 text-center">
              <Button
                href={orderUrl}
                className="bg-black text-white text-sm font-medium px-6 py-3 rounded-md box-border"
              >
                View your order
              </Button>
            </Section>

            <Hr className="border-gray-200 mx-8 w-auto" />

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
