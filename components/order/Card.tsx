"use server";
import { OrderStatus } from "@/lib/generated/prisma/client";
import Image from "next/image";
import { Badge } from "../ui/badge";
import {
  Card as ShadCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";
import { getServerSession } from "next-auth";

interface OrderItem {
  quantity: number;
  price: number;
  product: {
    name: string;
    images: { url: string; isPrimary: boolean }[];
  };
}

interface Props {
  orderId: string;
  userName: string;
  phone: string;
  street: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
}

const statusStyles: Record<OrderStatus, string> = {
  PENDING:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
  PAID: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  SHIPPED:
    "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  DELIVERED: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
  CANCELLED: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
};

export default async function Card({
  orderId,
  userName,
  phone,
  street,
  status,
  total,
  items,
}: Props) {
  const session = await getServerSession();
  const isAdmin = session?.user.role === "admin";

  return (
    <ShadCard className="flex flex-col justify-between">
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{userName}</CardTitle>
            <CardDescription>{phone}</CardDescription>
            <CardDescription>{street}</CardDescription>
          </div>
          <Badge className={statusStyles[status]}>{status}</Badge>
        </div>

        <Separator />

        <div className="flex flex-col gap-3">
          {items.map((item, idx) => {
            const cover = item.product.images.find((img) => img.isPrimary);
            return (
              <div key={idx} className="flex items-center gap-3">
                {cover && (
                  <Image
                    src={cover.url}
                    alt={item.product.name}
                    width={48}
                    height={48}
                    className="aspect-square object-cover rounded-md"
                  />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-6">
        <div className="flex w-full items-center justify-between">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="font-bold">${total.toFixed(2)}</p>
        </div>
        {isAdmin && (
          <Link className={"self-end"} href={`/admin/orders/${orderId}`}>
            <Button className={"px-3"}>
              View <Eye data-icon={"inline-end"} />
            </Button>
          </Link>
        )}
      </CardFooter>
    </ShadCard>
  );
}
