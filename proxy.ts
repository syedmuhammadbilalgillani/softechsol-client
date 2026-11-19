import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Only run proxy on /admin routes and protected APIs
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/backup")) {
    return NextResponse.next();
  }

  const isAuthPage =
    pathname === "/admin/signin" ||
    pathname === "/admin/login" ||
    pathname.startsWith("/admin/signin") ||
    pathname.startsWith("/admin/login");

  // Get NextAuth token using shared secret
  const secret =
    process.env.NEXTAUTH_SECRET ||
    "dhjsagiuey872y3cydhasie8q72YYXE872YEXYIAUSHX";

  let token = null;
  try {
    token = await getToken({
      req,
      secret,
      cookieName: "next-auth.session-token",
    });
    // Fallback check if default cookie name is used
    if (!token) {
      token = await getToken({ req, secret });
    }
  } catch (err: any) {
    console.warn("[Middleware] Error parsing JWT session token:", err?.message);
    token = null;
  }

  // If user is already authenticated and visits signin/login page -> redirect to /admin
  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  // If user is NOT authenticated and visits any other /admin route -> redirect to signin
  if (!token) {
    const signInUrl = new URL("/admin/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Enforce ADMIN or EDITOR role
  const userRole = (token as any)?.role;
  if (userRole !== "ADMIN" && userRole !== "EDITOR") {
    console.warn(
      `[Middleware] Unauthorized role "${userRole}" attempted to access ${pathname}`,
    );
    const signInUrl = new URL("/admin/signin", req.url);
    signInUrl.searchParams.set("error", "AccessDenied");
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/backup/:path*"],
};
