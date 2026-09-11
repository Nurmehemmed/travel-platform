import { NextResponse } from "next/server";
import { db, users } from "@travel/db";
import { eq } from "drizzle-orm";
import { signSessionToken, setSessionCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.AUTH_URL ||
    "http://localhost:3000";

  if (!code) {
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
      console.error("Token exchange failed:", tokenData);
      return NextResponse.redirect(`${baseUrl}/?auth_error=token_failed`);
    }

    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const googleUser = await userRes.json();

    if (!googleUser.email) {
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

    return NextResponse.redirect(`${baseUrl}/?auth_provider=google`);
  } catch (err) {
    console.error("[google callback error]:", err);
    return NextResponse.redirect(`${baseUrl}/?auth_error=google_callback_failed`);
  }
}
