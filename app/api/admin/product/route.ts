// add product

import { Product } from "@/lib/generated/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/client";

export async function POST(req: NextRequest) {
  try {
    // should i do this or use the proxy.ts that i have?
    // const session = await getServerSession(authOptions)
    // if(!session?.user.role) return NextResponse.json({message: "Unauthorized"}, {status: 402})

    const { name, description, imageURL, price }: Product = await req.json();
    const conPrice = Decimal(price);
    const product = await prisma.product.create({
      data: { name, description, imageURL, price: conPrice },
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
