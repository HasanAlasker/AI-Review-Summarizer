import { requireUserId } from "@/app/utils/requireUserId";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const cartInclude = {
  items: {
    where: { product: { isDeleted: false } },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          price: true,
          category: true,
          discountPrice: true,
          images: { where: { isPrimary: true }, select: { url: true } },
          stock: true
        },
      },
    },
  },
} as const;

export async function GET(req: NextRequest) {
  try {
    const userId = await requireUserId();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: cartInclude,
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
        include: cartInclude,
      });
    }

    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = await requireUserId();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) return NextResponse.json({ success: true }, { status: 200 }); // nothing to clear

    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
