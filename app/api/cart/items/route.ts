import { requireUserId } from "@/app/utils/requireUserId";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const productInclude = {
  product: {
    select: {
      id: true,
      name: true,
      price: true,
      category: true,
      discountPrice: true,
      images: { where: { isPrimary: true }, select: { url: true } },
    },
  },
};

// add item or update its quantity
export async function POST(req: NextRequest) {
  try {
    const userId = await requireUserId();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => null);
    const productId = body?.productId as string | undefined;
    const quantity = Number(body?.quantity ?? 1);

    if (!productId || !Number.isInteger(quantity) || quantity <= 0)
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

    const product = await prisma.product.findUnique({
      where: { id: productId, isDeleted: false },
    });
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    const cart = await prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const existing = await prisma.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });
    const resultingQty = (existing?.quantity ?? 0) + quantity;
    if (resultingQty > product.stock) {
      return NextResponse.json(
        { error: `Only ${product.stock} in stock`, available: product.stock },
        { status: 409 },
      );
    }

    const item = await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: { cartId: cart.id, productId, quantity },
      update: { quantity: { increment: quantity } },
      include: productInclude,
    });

    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
