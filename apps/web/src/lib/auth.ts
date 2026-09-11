import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

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
 * Clears the session cookie
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
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
