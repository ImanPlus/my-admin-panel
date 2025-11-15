// auth.config.ts

import Credentials from "@auth/core/providers/credentials";
import NextAuth, { DefaultSession, User } from "next-auth";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface User {
    access_token: string;
  }
  interface Session {
    user: {
      access_token: string;
    } & DefaultSession["user"];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        access_token: {},
      },
      async authorize(credentials) {
        const user: User | null = credentials
          ? {
              access_token: credentials?.access_token?.toString() ?? "",
              id: "1",
            }
          : null;
        return user;
      },
    }),
    Google,
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials") {
        token = { ...token, ...user };
      }
      return token;
    },
    session({ session, token }) {
      session.user = {
        ...session.user,
        access_token: token.access_token?.toString() ?? "",
      };
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});
