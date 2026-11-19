import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import logger from "@/lib/logger";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { decode as defaultDecode, encode as defaultEncode } from "next-auth/jwt";

const attemptBackendLogin = async (email: string, password: string) => {
  const cleanEmail = email.trim();
  console.log(`[NextAuth Server] Login attempt for email: "${cleanEmail}"`);

  let user = await prisma.user.findUnique({
    where: { email: cleanEmail },
  });

  // Fallback to case-insensitive lookup
  if (!user) {
    user = await prisma.user.findFirst({
      where: {
        email: {
          equals: cleanEmail,
          mode: "insensitive",
        },
      },
    });
  }

  if (!user) {
    console.error(`[NextAuth Server] Auth failed: No user found in database with email "${cleanEmail}"`);
    return null;
  }

  if (!user.is_active) {
    console.error(`[NextAuth Server] Auth failed: User "${cleanEmail}" (ID: ${user.user_id}) is marked inactive`);
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    console.error(`[NextAuth Server] Auth failed: Password mismatch for user "${cleanEmail}"`);
    return null;
  }

  console.log(`[NextAuth Server] Auth SUCCESS: User "${cleanEmail}" verified (Role: ${user.role})`);
  return user;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email?.trim();
          const password = credentials?.password ?? "";

          if (!email || !password) {
            console.error("[NextAuth Server] Missing credentials: Email or password was not provided");
            return null;
          }

          const user = await attemptBackendLogin(email, password);

          if (!user) {
            return null;
          }

          const name =
            (user.first_name || user.last_name) &&
            [user.first_name, user.last_name].filter(Boolean).join(" ");

          return {
            id: String(user.user_id),
            email: user.email,
            username: user.username,
            role: user.role,
            firstName: user.first_name,
            lastName: user.last_name,
            name: name || user.username || user.email,
          };
        } catch (error) {
          logger.error("Authorize error", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 24 hours
  },
  jwt: {
    maxAge: 60 * 60 * 24, // 24 hours
    async encode(params) {
      return defaultEncode(params);
    },
    async decode(params) {
      try {
        return await defaultDecode(params);
      } catch (err: any) {
        console.warn(
          "[NextAuth Server] Stale or invalid session token (decryption failed). Safely resetting session cookie.",
          err?.message
        );
        return null;
      }
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.user = {
          id: (user as any).id,
          email: (user as any).email,
          username: (user as any).username,
          role: (user as any).role,
          firstName: (user as any).firstName,
          lastName: (user as any).lastName,
          name: (user as any).name,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...(token.user as any),
        id: token.id as string,
        role: token.role as string,
      };
      return session;
    },
  },
  pages: {
    signIn: "/admin/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

