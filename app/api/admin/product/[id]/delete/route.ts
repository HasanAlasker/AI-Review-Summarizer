import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}
export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const product = await prisma.product.update({
      where: { id },
      data: { isDeleted: true },
    });
    return NextResponse.json({ deletedProduct: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
