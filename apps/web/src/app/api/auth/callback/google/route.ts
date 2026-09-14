import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db, users, recordAuditLog } from "@travel/db";
import { eq } from "drizzle-orm";
import { signSessionToken, setSessionCookie, getRequestBaseUrl } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const baseUrl = getRequestBaseUrl(request);

  const cookieStore = await cookies();
  const savedState = cookieStore.get("oauth_google_state")?.value;
  cookieStore.delete("oauth_google_state");

  if (!state || !savedState || state !== savedState) {
    logger.warn("Google OAuth callback state CSRF validation failed");
    return NextResponse.redirect(`${baseUrl}/?auth_error=csrf_state_mismatch`);
  }

  if (!code) {
    logger.warn("Google OAuth callback missing code parameter");
    return NextResponse.redirect(`${baseUrl}/?auth_error=no_code`);
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.AUTH_GOOGLE_ID!,
        client_secret: process.env.AUTH_GOOGLE_SECRET!,
        redirect_uri: `${baseUrl}/api/auth/callback/google`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      logger.error("Google token exchange failed:", tokenData);
      return NextResponse.redirect(`${baseUrl}/?auth_error=token_failed`);
    }

    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const googleUser = await userRes.json();

    if (!googleUser.email) {
      logger.error("Google userinfo returned no email");
      return NextResponse.redirect(`${baseUrl}/?auth_error=no_email`);
    }

    let [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, googleUser.email.toLowerCase()))
      .limit(1);

    if (!existingUser) {
      const [newUser] = await db
        .insert(users)
        .values({
          id: crypto.randomUUID(),
          name: googleUser.name || googleUser.email.split("@")[0],
          email: googleUser.email.toLowerCase(),
          image: googleUser.picture,
          emailVerified: new Date(),
        })
        .returning();
      existingUser = newUser;
    }

    if (!existingUser) {
      return NextResponse.redirect(`${baseUrl}/?auth_error=user_upsert_failed`);
    }

    const token = await signSessionToken({
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email!,
      role: existingUser.role || "customer",
    });
    await setSessionCookie(token);

    await recordAuditLog({
      action: "auth.login_google",
      entityType: "user",
      entityId: existingUser.id,
      actorType: existingUser.role === "admin" ? "admin" : "customer",
      actorEmail: existingUser.email,
      metadata: { provider: "google", email: existingUser.email },
    });

    logger.info("Google OAuth login successful", { email: existingUser.email });
    return NextResponse.redirect(`${baseUrl}/?auth_provider=google`);
  } catch (err) {
    logger.error("Google callback error:", err);
    return NextResponse.redirect(`${baseUrl}/?auth_error=google_callback_failed`);
  }
}
