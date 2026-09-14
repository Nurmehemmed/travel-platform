import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { db, users, recordAuditLog } from "@travel/db";
import { eq } from "drizzle-orm";
import { signSessionToken, setSessionCookie, getRequestBaseUrl } from "@/lib/auth";
import { logger } from "@/lib/logger";

const APPLE_JWKS = createRemoteJWKSet(new URL("https://appleid.apple.com/auth/keys"));

/**
 * Apple OAuth Callback Route.
 * Apple sends a POST request with application/x-www-form-urlencoded body containing:
 * - code: authorization code
 * - id_token: signed JWT from Apple containing user email and sub
 * - user: (optional) JSON string containing user name on first login
 */
export async function POST(request: Request) {
  const baseUrl = getRequestBaseUrl(request);

  try {
    const formData = await request.formData();
    const idToken = formData.get("id_token") as string | null;
    const userJson = formData.get("user") as string | null;
    const state = formData.get("state") as string | null;
    const appleClientId = process.env.AUTH_APPLE_ID;

    // Verify CSRF state
    const cookieStore = await cookies();
    const savedState = cookieStore.get("oauth_apple_state")?.value;
    cookieStore.delete("oauth_apple_state");

    if (savedState && (!state || state !== savedState)) {
      logger.warn("Apple OAuth callback state CSRF validation failed");
      return NextResponse.redirect(`${baseUrl}/?auth_error=csrf_state_mismatch`, { status: 303 });
    }

    if (!idToken) {
      logger.warn("Apple OAuth callback missing id_token");
      return NextResponse.redirect(`${baseUrl}/?auth_error=apple_no_token`, { status: 303 });
    }

    if (!appleClientId) {
      logger.error("AUTH_APPLE_ID environment variable is missing");
      return NextResponse.redirect(`${baseUrl}/?auth_error=apple_unconfigured`, { status: 303 });
    }

    // Cryptographically verify Apple's id_token against Apple's live JWKS public keys
    const { payload } = await jwtVerify(idToken, APPLE_JWKS, {
      issuer: "https://appleid.apple.com",
      audience: appleClientId,
    });

    const email = (payload.email as string)?.toLowerCase();
    const appleSub = payload.sub as string;

    if (!email && !appleSub) {
      logger.error("Apple id_token payload missing email and sub");
      return NextResponse.redirect(`${baseUrl}/?auth_error=apple_no_identity`, { status: 303 });
    }

    // Parse user name if Apple provided it (only on first login)
    let parsedName: string | null = null;
    if (userJson) {
      try {
        const u = JSON.parse(userJson);
        const nameParts = [u.name?.firstName, u.name?.lastName].filter(Boolean);
        if (nameParts.length > 0) {
          parsedName = nameParts.join(" ");
        }
      } catch {
        // ignore JSON parse error
      }
    }

    const userEmail = email || `apple_${appleSub.slice(0, 10)}@privaterelay.appleid.com`;
    const userName = parsedName || userEmail.split("@")[0];

    // Find or create user in database
    let [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, userEmail))
      .limit(1);

    if (!existingUser) {
      const [newUser] = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          name: userName,
          email: userEmail,
          emailVerified: new Date(),
        })
        .returning();
      existingUser = newUser;
    }

    if (!existingUser) {
      return NextResponse.redirect(`${baseUrl}/?auth_error=apple_db_failed`, { status: 303 });
    }

    // Create session token and set cookie
    const token = await signSessionToken({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email!,
      role: existingUser.role || "customer",
    });
    await setSessionCookie(token);

    await recordAuditLog({
      action: "auth.login_apple",
      entityType: "user",
      entityId: existingUser.id,
      actorType: existingUser.role === "admin" ? "admin" : "customer",
      actorEmail: existingUser.email,
      metadata: { provider: "apple", sub: appleSub },
    });

    logger.info("Apple OAuth login successful", { email: existingUser.email });
    return NextResponse.redirect(`${baseUrl}/?auth_provider=apple`, { status: 303 });
  } catch (err) {
    logger.error("Apple callback verification error:", err);
    return NextResponse.redirect(`${baseUrl}/?auth_error=apple_verification_failed`, { status: 303 });
  }
}
