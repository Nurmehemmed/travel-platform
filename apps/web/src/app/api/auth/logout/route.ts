import { NextResponse } from "next/server";
import { SESSION_COOKIE_NAME, clearSessionCookie, getCurrentUser } from "@/lib/auth";
import { recordAuditLog } from "@travel/db";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (user) {
      await recordAuditLog({
        action: "auth.logout",
        entityType: "user",
        entityId: user.id,
        actorType: user.role === "admin" ? "admin" : "customer",
        actorEmail: user.email,
      });
      logger.info("User logged out", { email: user.email });
    }

    await clearSessionCookie();

    const response = NextResponse.json(
      { success: true },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );

    // Set cookie explicitly on outgoing response with exact matching attributes
    response.cookies.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  } catch (error: any) {
    logger.error("Logout API error:", error);
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
  }
}
