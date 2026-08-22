import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // `user` is only defined on sign-in, not on every request
      if (user) {
        token.role = user.role!;
        token.id = user.id!;
        token.phone = user.phone ?? undefined;
        token.street = user.street ?? undefined;
      }
      // On subsequent requests, re-fetch fresh role from DB in case it changed
      else if (token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser.id;
          token.phone = dbUser.phone ?? undefined;
          token.street = dbUser.street ?? undefined;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.id = token.id ?? token.sub;
        session.user.phone = token.phone ?? undefined;
        session.user.street = token.street ?? undefined;
      }
      return session;
    },

  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
