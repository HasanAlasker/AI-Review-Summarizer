import { AIclient } from "@/lib/aiClient";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: Promise<{ id: string }>;
}

const reviewLimit = 10;

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { id: productId } = await params;
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
    const { id: productId } = await params;

    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      take: reviewLimit,
    });

    if (reviews.length === 0) {
      return NextResponse.json(
        { message: "No reviews to summarize" },
        { status: 400 },
      );
    }

    const joinedReviews = reviews.map((r) => r.content).join("\n\n");
    const summary = await AIclient.GenerateSummary(joinedReviews);
    if (!summary)
      return NextResponse.json(
        { message: "Error generating summary" },
        { status: 500 },
      );

    let expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 10);

    const savedSummary = await prisma.summary.upsert({
      where: { productId },
      update: { content: summary },
      create: { productId, content: summary, expiresAt: expiresIn },
    });

    return NextResponse.json({ summary: savedSummary }, { status: 201 });
  } catch (error) {
    console.error("POST /summary error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
