import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ECart from "@/components/empty/ECart";

export default async function page() {
  const session = await getServerSession(authOptions);
  const cart = await prisma.cart.findUnique({
    where: { userId: session?.user.id },
    include: { items: true },
  });

  if (!cart || cart.items.length === 0) return <ECart />;
  return <div>page</div>;
}
