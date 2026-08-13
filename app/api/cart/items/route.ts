import { requireUserId } from "@/app/utils/requireUserId";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
      where: { id: productId },
      select: {
        id: true,
        name: true,
        price: true,
        category: true,
        images: true,
        discountPrice: true,
      },
    });
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    const cart = await prisma.cart.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    const item = await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      create: { cartId: cart.id, productId, quantity },
      update: { quantity: { increment: quantity } },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            category: true,
            images: true,
            discountPrice: true,
          },
        },
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
