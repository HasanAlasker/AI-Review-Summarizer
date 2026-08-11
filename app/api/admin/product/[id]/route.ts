import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import * as Yup from "yup";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const imageSchema = Yup.object({
  publicId: Yup.string().required(),
  url: Yup.string().url().required(),
});

const updateProductSchema = Yup.object({
  name: Yup.string().trim().required(),
  categoryId: Yup.string().required(),
  description: Yup.string().trim().required().min(15).max(500),
  price: Yup.number().positive().required(),
  stock: Yup.number().integer().min(0).required(),
  images: Yup.array().of(imageSchema).min(1).required(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const values = await updateProductSchema.validate(body, {
      abortEarly: false,
    });

    const existing = await prisma.product.findUnique({
      where: { id, isDeleted: false },
      include: { images: { where: { isDeleted: false } } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const incomingPublicIds = new Set(values.images.map((img) => img.publicId));
    const existingPublicIds = new Set(
      existing.images.map((img) => img.publicId),
    );

    // images present before but missing from the incoming payload -> removed by the user
    const toSoftDelete = existing.images.filter(
      (img) => !incomingPublicIds.has(img.publicId),
    );

    // images in the payload that aren't already rows -> newly uploaded
    const toCreate = values.images.filter(
      (img) => !existingPublicIds.has(img.publicId),
    );

    const primaryPublicId = values.images[0]?.publicId;

    await prisma.$transaction(async (tx) => {
      await tx.product.update({
        where: { id },
        data: {
          name: values.name,
          categoryId: values.categoryId,
          description: values.description,
          price: values.price,
          stock: values.stock,
        },
      });

      if (toSoftDelete.length) {
        await tx.image.updateMany({
          where: { id: { in: toSoftDelete.map((img) => img.id) } },
          data: { isDeleted: true, isPrimary: false },
        });
      }

      if (toCreate.length) {
        await tx.image.createMany({
          data: toCreate.map((img) => ({
            url: img.url,
            publicId: img.publicId,
            productId: id,
            isPrimary: img.publicId === primaryPublicId,
          })),
        });
      }

      // re-sync isPrimary across all kept + new images so exactly one is true
      await tx.image.updateMany({
        where: { productId: id, isDeleted: false },
        data: { isPrimary: false },
      });
      if (primaryPublicId) {
        await tx.image.updateMany({
          where: { productId: id, publicId: primaryPublicId, isDeleted: false },
          data: { isPrimary: true },
        });
      }
    });

    // Cloudinary cleanup happens only after the DB transaction commits,
    // so a failed transaction never orphans a still-referenced image.
    if (toSoftDelete.length) {
      await Promise.allSettled(
        toSoftDelete.map((img) => cloudinary.uploader.destroy(img.publicId)),
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((e) => {
        if (e.path) errors[e.path] = e.message;
      });
      return NextResponse.json({ errors }, { status: 400 });
    }

    console.error("Product update error:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}
