import { NextResponse } from "next/server";
import { db, users } from "@travel/db";
import { eq } from "drizzle-orm";
import { signSessionToken, setSessionCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const googleClientId = process.env.AUTH_GOOGLE_ID;
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.AUTH_URL ||
    "http://localhost:3000";

  // 1. If real Google OAuth credentials are provided, redirect to Google OAuth consent
  if (googleClientId && process.env.AUTH_GOOGLE_SECRET) {
    const redirectUri = `${baseUrl}/api/auth/callback/google`;
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleAuthUrl.searchParams.set("client_id", googleClientId);
    googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
    googleAuthUrl.searchParams.set("response_type", "code");
    googleAuthUrl.searchParams.set("scope", "openid email profile");
    googleAuthUrl.searchParams.set("prompt", "select_account");
    return NextResponse.redirect(googleAuthUrl.toString());
  }

  // 2. Fallback Dev Mode: Create / sign-in with verified Google user in Neon DB
  try {
    const devEmail = "google.traveler@gmail.com";
    const devName = "Alex Wanderer (Google)";
    const devImage =
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face";

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
        })
        .returning();
      existing = created;
    }

    if (!existing) {
      return NextResponse.redirect(`${baseUrl}/?auth_error=google_dev_failed`);
    }

    const token = await signSessionToken({
      id: existing.id,
      name: existing.name,
      email: existing.email!,
      role: existing.role || "admin",
    });
    await setSessionCookie(token);

    return NextResponse.redirect(`${baseUrl}/?auth_provider=google`);
  } catch (error: any) {
    console.error("[google auth dev error]:", error);
    return NextResponse.redirect(`${baseUrl}/?auth_error=google_failed`);
  }
}
