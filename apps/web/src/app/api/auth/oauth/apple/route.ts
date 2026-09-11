import { NextResponse } from "next/server";
import { db, users } from "@travel/db";
import { eq } from "drizzle-orm";
import { signSessionToken, setSessionCookie } from "@/lib/auth";

export async function GET(request: Request) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.AUTH_URL ||
    "http://localhost:3000";

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
      role: existing.role || "admin",
    });
    await setSessionCookie(token);

    return NextResponse.redirect(`${baseUrl}/?auth_provider=apple`);
  } catch (error: any) {
    console.error("[apple auth dev error]:", error);
    return NextResponse.redirect(`${baseUrl}/?auth_error=apple_failed`);
  }
}
