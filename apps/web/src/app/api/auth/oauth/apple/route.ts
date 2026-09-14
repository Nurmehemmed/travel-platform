import { NextResponse } from "next/server";
import { db, users, recordAuditLog } from "@travel/db";
import { eq } from "drizzle-orm";
import { signSessionToken, setSessionCookie, getRequestBaseUrl } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function GET(request: Request) {
  const baseUrl = getRequestBaseUrl(request);
  const appleClientId = process.env.AUTH_APPLE_ID;

  // 1. If real Apple OAuth Services ID is provided, redirect to Apple Sign-In
  if (appleClientId) {
    const redirectUri = `${baseUrl}/api/auth/callback/apple`;
    const state = crypto.randomUUID();
    const appleAuthUrl = new URL("https://appleid.apple.com/auth/authorize");
    appleAuthUrl.searchParams.set("client_id", appleClientId);
    appleAuthUrl.searchParams.set("redirect_uri", redirectUri);
    appleAuthUrl.searchParams.set("response_type", "code id_token");
    appleAuthUrl.searchParams.set("response_mode", "form_post");
    appleAuthUrl.searchParams.set("scope", "name email");
    appleAuthUrl.searchParams.set("state", state);

    logger.info("Redirecting to Apple OAuth", { redirectUri });
    const response = NextResponse.redirect(appleAuthUrl.toString());
    response.cookies.set("oauth_apple_state", state, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // Apple form_post is cross-site POST, requires SameSite=None + Secure
      maxAge: 600, // 10 minutes
      path: "/",
    });
    return response;
  }

  // In production, never allow simulated fallback login if credentials are missing
  if (process.env.NODE_ENV === "production") {
    logger.error("Apple OAuth credentials (AUTH_APPLE_ID) missing in production");
    return NextResponse.redirect(`${baseUrl}/?auth_error=apple_unconfigured`);
  }

  // 2. Development Simulation Mode: Sign-in with demo customer user in Neon DB
  try {
    const devEmail = "apple.traveler@icloud.com";
    const devName = "Jordan Rivers (Apple)";
    const devImage =
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face";

    let [existing] = await db
      .select()
      .from(users)
      .where(eq(users.email, devEmail))
      .limit(1);

    if (!existing) {
      const newId = crypto.randomUUID();
      const [created] = await db
        .insert(users)
        .values({
          id: newId,
          name: devName,
          email: devEmail,
          image: devImage,
          emailVerified: new Date(),
          role: "customer",
        })
        .returning();
      existing = created;
    }

    if (!existing) {
      return NextResponse.redirect(`${baseUrl}/?auth_error=apple_dev_failed`);
    }

    const token = await signSessionToken({
      id: existing.id,
      name: existing.name,
      email: existing.email!,
      role: existing.role || "customer",
    });
    await setSessionCookie(token);

    await recordAuditLog({
      action: "auth.login_apple",
      entityType: "user",
      entityId: existing.id,
      actorType: existing.role === "admin" ? "admin" : "customer",
      actorEmail: existing.email,
      metadata: { provider: "apple", simulated: true },
    });

    logger.info("Apple OAuth login successful", { email: existing.email, baseUrl });
    return NextResponse.redirect(`${baseUrl}/?auth_provider=apple`);
  } catch (error: any) {
    logger.error("Apple auth error:", error);
    return NextResponse.redirect(`${baseUrl}/?auth_error=apple_failed`);
  }
}
