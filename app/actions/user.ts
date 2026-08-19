"use server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import * as Yup from "yup";
import { authOptions } from "../api/auth/[...nextauth]/route";

const updateSchema = Yup.object({
  phone: Yup.string()
    .required()
    .matches(/^[0-9+\-\s()]{7,15}$/),
  street: Yup.string().required().min(3),
});

export async function updateUserInfo(values: {
  phone: string;
  street: string;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  await updateSchema.validate(values);

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      phone: values.phone,
      street: values.street,
    },
  });

  return updated;
}
