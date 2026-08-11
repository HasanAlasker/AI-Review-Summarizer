import { Product } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";

interface ProductReq extends Product {
  images: { publicId: string; url: string }[];
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, price, categoryId, stock, images }: ProductReq =
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

    images.map(
      async (i) =>
        await prisma.image.createMany({
          data: { productId: product.id, publicId: i.publicId, url: i.url },
        }),
    );

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("GET /summary error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
