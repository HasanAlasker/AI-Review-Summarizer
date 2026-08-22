import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ productId: string }>;
}

export async function POST(req: NextRequest, { params }: Props) {
  const { productId } = await params;
  const { rating, review } = await req.json();

  const session = await getServerSession(authOptions);
  const authorId = session?.user.id;
  if (!authorId || session.user.role === "admin")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const newReview = await prisma.review.create({
      data: { authorId, content: review, rating, productId },
    });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
