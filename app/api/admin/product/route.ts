import { Product } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, description, price, categoryId, stock }: Product =
      await req.json();
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Decimal(price),
        categoryId,
        stock: Number(stock),
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("GET /summary error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
