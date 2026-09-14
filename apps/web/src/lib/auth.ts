import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

if (process.env.NODE_ENV === "production" && !process.env.AUTH_SECRET) {
  throw new Error("FATAL: AUTH_SECRET must be set in production environment.");
}

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || "addmetour-dev-fallback-secret-2025"
);

export const SESSION_COOKIE_NAME = "travel_session";

export interface SessionPayload {
  id: string;
  email: string;
  name?: string | null;
  role?: string | null;
}

/**
 * Signs a JWT session token valid for 7 days
 */
export async function signSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET_KEY);
}

/**
 * Verifies a JWT session token and returns decoded payload
 */
export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: (payload.name as string) || null,
      role: (payload.role as string) || "customer",
    };
  } catch {
    return null;
  }
}

/**
 * Sets secure HTTP-only cookie for the user session
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

/**
 * Clears the session cookie with exact matching attributes across all browsers
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });
}

/**
 * Retrieves the current authenticated user from request cookies
 */
export async function getCurrentUser(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

/**
 * Requires the current session to be an authenticated administrator.
 * Returns the admin session payload if authorized, or null if unauthorized.
 * NEVER allows anonymous bypass in production.
 */
export async function requireAdmin(): Promise<SessionPayload | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    if (process.env.NODE_ENV !== "production" && process.env.DEV_ADMIN_BYPASS === "true") {
      return {
        id: "dev-admin",
        email: "admin@addmetour.az",
        name: "Dev Admin",
        role: "admin",
      };
    }
    return null;
  }
  return user;
}

/**
 * Resolves the accurate public base URL from incoming request headers or fallback.
 * Works seamlessly across custom domains, Vercel deployments, and localhost.
 */
export function getRequestBaseUrl(request: Request): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  if (forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  const host = request.headers.get("host");
  if (host) {
    const proto = host.includes("localhost") ? "http" : "https";
    return `${proto}://${host}`;
  }

  try {
    const parsed = new URL(request.url);
    if (parsed.origin) {
      return parsed.origin;
    }
  } catch {}

  if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return process.env.NEXT_PUBLIC_APP_URL || process.env.AUTH_URL || "http://localhost:3000";
}
