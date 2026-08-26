"use server";
import { prisma } from "@/lib/prisma";

type SubResult =
  | { success: true; subscription: { id: string; email: string } }
  | { success: false; message: string };

export const subscribe = async (email: string): Promise<SubResult> => {
  try {
    const exists = await prisma.subscription.findUnique({ where: { email } });
    if (exists)
      return { success: false, message: "You're already subscribed!" };
    const newSub = await prisma.subscription.create({ data: { email } });
    if (!newSub)
      return { success: false, message: "Couldn't subscribe, try later!" };

    return {
      success: true,
      subscription: { id: newSub.id, email: newSub.email },
    };
  } catch (error) {
    console.error("subscription failed:", error);
    return { success: false, message: "Couldn't save your email" };
  }
};
