import { ReviewWithRelations } from "@/types/reviewWithRel";
import { Session } from "next-auth";

interface Props {
  productId: string;
  rating: number;
  content: string;
  user: Session["user"];
}

export function buildOptimisticReview({
  productId,
  rating,
  content,
  user,
}: Props): ReviewWithRelations {
  return {
    id: crypto.randomUUID(),
    content,
    productId,
    rating,
    isDeleted: false,
    authorId: user.id,
    createdAt: new Date(),
    author: {
      id: user.id,
      name: user.name ?? null,
      email: user.email ?? null,
      emailVerified: null,
      image: user.image ?? null,
      role: user.role ?? "user",
      phone: null,
      street: null,
      isDeleted: false,
    },
  };
}
