import { requireUserId } from "@/app/utils/requireUserId";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ productId: string }>;
}

// edit item
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

    const item = await prisma.cartItem.update({
      where: { cartId_productId: { cartId: cart.id, productId } },
      data: { quantity },
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
