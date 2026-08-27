import { OrderStatus } from "@/lib/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { EmailClient } from "@/lib/sendEmail";
import { orderWithRelations, serializeOrder } from "@/types/orderWithRel";

interface Props {
  params: Promise<{ id: string }>;
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await req.json();

  if (!Object.values(OrderStatus).includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id },
    data: { status },
    ...orderWithRelations,
  });

  try {
    await EmailClient.OrderStatusUpdate(serializeOrder(order), {
      trackingUrl: `${process.env.NEXTAUTH_URL}/orders/${order.id}`,
    });
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }

  return NextResponse.json(order, { status: 200 });
}
