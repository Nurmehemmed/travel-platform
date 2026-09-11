import { NextResponse } from "next/server";
import { db, users, recordAuditLog } from "@travel/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { signSessionToken, setSessionCookie } from "@/lib/auth";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  try {
    const rl = checkRateLimit(`login_${ip}`, { limit: 15, windowMs: 5 * 60 * 1000 });
    if (!rl.success) {
      logger.warn("Login rate limit exceeded", { ip });
      return NextResponse.json(
        { error: "Too many login attempts. Please wait 5 minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const trimmedEmail = String(email).trim().toLowerCase();

    // Query user by email
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        passwordHash: users.passwordHash,
      })
      .from(users)
      .where(eq(users.email, trimmedEmail))
      .limit(1);

    if (!user || !user.passwordHash) {
      logger.warn("Login attempt for non-existent user", { email: trimmedEmail, ip });
      await recordAuditLog({
        action: "auth.login_failed",
        entityType: "user",
        entityId: trimmedEmail,
        actorType: "system",
        actorEmail: trimmedEmail,
        ipAddress: ip,
        metadata: { reason: "User not found" },
      });
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      logger.warn("Login failed: invalid password", { email: trimmedEmail, userId: user.id, ip });
      await recordAuditLog({
        action: "auth.login_failed",
        entityType: "user",
        entityId: user.id,
        actorType: user.role === "admin" ? "admin" : "customer",
        actorEmail: user.email || trimmedEmail,
        ipAddress: ip,
        metadata: { reason: "Invalid password" },
      });
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create session token & cookie
    const token = await signSessionToken({
      id: user.id,
      name: user.name,
      email: user.email!,
      role: user.role || "customer",
    });
    await setSessionCookie(token);

    // Audit log successful login
    await recordAuditLog({
      action: "auth.login_success",
      entityType: "user",
      entityId: user.id,
      actorType: user.role === "admin" ? "admin" : "customer",
      actorEmail: user.email || trimmedEmail,
      ipAddress: ip,
      metadata: { role: user.role },
    });

    logger.info("User logged in successfully", {
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || "customer",
      },
    });
  } catch (error: any) {
    logger.error("Login API error:", error, { ip });
    return NextResponse.json(
      { error: error?.message || "Internal server error during login" },
      { status: 500 }
    );
  }
}
