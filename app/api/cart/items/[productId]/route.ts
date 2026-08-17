import { requireUserId } from "@/app/utils/requireUserId";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { productInclude } from "../route";

interface Props {
  params: Promise<{ productId: string }>;
}

// edit item
// todo: check product stock
export async function PATCH(req: NextRequest, { params }: Props) {
  try {
    const { productId } = await params;
    const userId = await requireUserId();
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => null);
    const quantity = Number(body?.quantity);

    if (!Number.isInteger(quantity) || quantity <= 0)
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (quantity > product.stock) {
      return NextResponse.json(
        { error: `Only ${product.stock} in stock`, available: product.stock },
        { status: 409 },
      );
    }

    const item = await prisma.cartItem.update({
      where: { cartId_productId: { cartId: cart.id, productId } },
      data: { quantity },
      include: productInclude,
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

// delete item
export async function DELETE(
  _req: Request,
  { params }: { params: { productId: string } },
) {
  const userId = await requireUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    return NextResponse.json({ success: true }); // already gone, nothing to do
  }

  await prisma.cartItem
    .delete({
      where: {
        cartId_productId: { cartId: cart.id, productId: params.productId },
      },
    })
    .catch(() => null); // fine if it was already removed

  return NextResponse.json({ success: true });
}
