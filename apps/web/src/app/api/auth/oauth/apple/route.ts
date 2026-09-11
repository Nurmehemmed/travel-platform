import { NextResponse } from "next/server";
import { db, users, recordAuditLog } from "@travel/db";
import { eq } from "drizzle-orm";
import { signSessionToken, setSessionCookie, getRequestBaseUrl } from "@/lib/auth";
import { logger } from "@/lib/logger";

export async function GET(request: Request) {
  const baseUrl = getRequestBaseUrl(request);

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
