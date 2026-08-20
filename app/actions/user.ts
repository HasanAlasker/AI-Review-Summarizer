"use server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import * as Yup from "yup";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { FormValues } from "@/components/cart/CheckoutBtn";

const updateSchema = Yup.object({
  phone: Yup.string()
    .required()
    .matches(/^[0-9+\-\s()]{7,15}$/),
  street: Yup.string().required().min(3),
});

type UpdateUserResult =
  | { success: true; user: { phone: string | null; street: string | null } }
  | { success: false; message: string };
  
export async function updateUserInfo(values: FormValues): Promise<UpdateUserResult> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    await updateSchema.validate(values);
  } catch (err) {
    return {
      success: false,
      message: err instanceof Yup.ValidationError ? err.message : "Invalid input",
    };
  }

  try {
    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: { phone: values.phone, street: values.street },
      select: {phone: true, street: true}
    });
    return { success: true, user: updated };
  } catch (error) {
    console.error("updateUserInfo failed:", error);
    return { success: false, message: "Couldn't save your info" };
  }
}