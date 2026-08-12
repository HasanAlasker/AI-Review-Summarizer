import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/client";
import { NextRequest, NextResponse } from "next/server";
import * as Yup from "yup";

const imageSchema = Yup.object({
  publicId: Yup.string().required(),
  url: Yup.string().url().required(),
  isPrimary: Yup.boolean().required(),
});

const createProductSchema = Yup.object({
  name: Yup.string().trim().required(),
  categoryId: Yup.string().required(),
  description: Yup.string().trim().required().min(15).max(500),
  price: Yup.number().positive().required(),
  discountPrice: Yup.number()
    .positive()
    .nullable()
    .optional()
    .test(
      "less-than-price",
      "discountPrice must be less than price",
      function (value) {
        if (value == null) return true;
        return value < this.parent.price;
      },
    ),
  stock: Yup.number().integer().min(0).required(),
  images: Yup.array().of(imageSchema).min(1).required(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const values = await createProductSchema.validate(body, {
      abortEarly: false,
    });

    // ensure exactly one primary, defaulting to the first image
    // if the client somehow sent none flagged
    const hasPrimary = values.images.some((img) => img.isPrimary);
    const images = hasPrimary
      ? values.images
      : values.images.map((img, i) => ({ ...img, isPrimary: i === 0 }));

    const product = await prisma.$transaction(async (tx) => {
      const created = await tx.product.create({
        data: {
          name: values.name,
          description: values.description,
          price: new Decimal(values.price),
          discountPrice:
            values.discountPrice != null
              ? new Decimal(values.discountPrice)
              : null,
          categoryId: values.categoryId,
          stock: values.stock,
        },
      });

      await tx.image.createMany({
        data: images.map((img) => ({
          productId: created.id,
          publicId: img.publicId,
          url: img.url,
          isPrimary: img.isPrimary,
        })),
      });

      return created;
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((e) => {
        if (e.path) errors[e.path] = e.message;
      });
      return NextResponse.json({ errors }, { status: 400 });
    }

    console.error("POST /api/admin/product error:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
