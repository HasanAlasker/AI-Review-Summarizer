import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function requireUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  return session.user.id;
}
