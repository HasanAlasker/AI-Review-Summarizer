import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ productId: string }>;
}

const reviewLimit = 10;

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { productId } = await params;
    const summary = await prisma.summary.findFirst({ where: { productId } });

    if (!summary)
      return NextResponse.json(
        { message: "No summary available", summary: "" },
        { status: 404 },
      );

    return NextResponse.json({ summary }, { status: 200 });
  } catch (error) {
    console.error("GET /summary error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest, { params }: Props) {
  try {
    const { productId } = await params;

    // get latest 10 reviews
    // join them in one string
    // send them as a prompt to Gemini
    // return res

    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      take: reviewLimit,
    });

    const joinedReviews = reviews.map((r) => r.content).join("\n\n");
    return NextResponse.json({ reviews: joinedReviews }, { status: 201 });
  } catch (error) {}
}
