import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Only run middleware logic on /admin and protected API routes
  if (pathname.startsWith("/admin") || pathname === "/api/backup") {
    const isSignInPage = pathname === "/admin/signin";

    const secret = process.env.NEXTAUTH_SECRET;
    let token = null;

    if (secret) {
      try {
        token = await getToken({
          req,
          secret,
        });
      } catch {
        // Token retrieval failed
      }
    }

    // Authenticated user trying to access sign-in page -> redirect to /admin
    if (isSignInPage && token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // Unauthenticated user trying to access /admin routes (except /admin/signin)
    if (!isSignInPage && (!token || token.role !== "ADMIN")) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Unauthorized access" },
          { status: 401 }
        );
      }

      const signInUrl = new URL("/admin/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/backup/:path*",
  ],
};

