import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import logger from "@/lib/logger";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const attemptBackendLogin = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    logger.error("User not found for email");
    return null;
  }

  if (!user.is_active) {
    logger.error("User inactive");
    return null;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    logger.error("Password mismatch");
    return null;
  }

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
            logger.error("Missing email or password");
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

