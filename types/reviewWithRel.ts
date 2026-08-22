import { Prisma } from "@/lib/generated/prisma/client";

export const reviewWithRelations = {
  include: { author: true },
} satisfies Prisma.ReviewDefaultArgs;

export type ReviewWithRelations = Prisma.ReviewGetPayload<
  typeof reviewWithRelations
>;
