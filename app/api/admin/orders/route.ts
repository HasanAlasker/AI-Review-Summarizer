import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const orders = await prisma.order.findMany({
      where: { status: "PENDING" },
      include: {
        items: {
          include: {
            product: { include: { images: { where: { isPrimary: true } } } },
          },
        },
        user: {
          select: {
            email: true,
            name: true,
            phone: true,
            street: true,
            id: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
