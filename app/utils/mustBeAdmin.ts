import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return false;
  return session.user.role === "admin";
}
