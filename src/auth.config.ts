import type { NextAuthConfig } from "next-auth";

/** Edge-safe auth config — no Prisma or bcrypt imports. */
export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" as const },
  pages: {
    signIn: "/admin/login",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
