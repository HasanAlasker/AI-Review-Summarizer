// add product

import { Product } from "@/lib/generated/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/client";

export async function POST(req: NextRequest) {
  try {
    const { name, description, price, categoryId, stock }: Product =
      await req.json();
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Decimal(price),
        categoryId: "c2c07793-d723-4ff0-9867-980b68c0b7c1",
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
