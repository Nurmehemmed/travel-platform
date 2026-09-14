import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("FATAL: AUTH_SECRET must be configured in production environment.");
    }
    return new TextEncoder().encode("addmetour-dev-fallback-secret-2025");
  }
  return new TextEncoder().encode(secret);
}

const SESSION_COOKIE_NAME = "travel_session";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect Admin Dashboard & Admin APIs
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;

    let isAdmin = false;

    if (token) {
      try {
        const key = getSecretKey();
        const { payload } = await jwtVerify(token, key);
        if (payload?.role === "admin") {
          isAdmin = true;
        }
      } catch {
        isAdmin = false;
      }
    }

    // In development mode only, allow access if DEV_ADMIN_BYPASS is explicitly set
    if (!isAdmin && process.env.NODE_ENV !== "production" && process.env.DEV_ADMIN_BYPASS === "true") {
      isAdmin = true;
    }

    if (!isAdmin) {
      // API routes return 401 JSON
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json(
          { error: "Unauthorized: Administrative privileges required." },
          { status: 401 }
        );
      }

      // Page routes redirect to home with auth modal prompt
      const loginUrl = new URL("/", req.url);
      loginUrl.searchParams.set("auth", "login");
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
