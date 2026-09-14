import { NextResponse } from "next/server";
import { db, siteSettings, recordAuditLog } from "@travel/db";
import { eq, asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";

const log = logger.withContext({ route: "/api/admin/settings" });

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const list = await db
      .select()
      .from(siteSettings)
      .orderBy(asc(siteSettings.category), asc(siteSettings.key));

    return NextResponse.json({ settings: list });
  } catch (error: any) {
    log.error("Failed to fetch admin site settings", error);
    return NextResponse.json(
      { error: "Failed to fetch site settings" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const body = await req.json();
    const updates: Record<string, any> = body.updates || {};

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No settings provided to update" }, { status: 400 });
    }

    const updatedKeys: string[] = [];

    for (const [key, value] of Object.entries(updates)) {
      await db
        .update(siteSettings)
        .set({
          value: value,
          updatedAt: new Date(),
          updatedBy: admin.email,
        })
        .where(eq(siteSettings.key, key));

      updatedKeys.push(key);
    }

    await recordAuditLog({
      entityType: "system",
      entityId: "site_settings",
      action: "settings.updated",
      actorEmail: admin.email,
      actorRole: "admin",
      metadata: {
        updatedKeys,
        updates,
      },
    });

    log.info(`Site settings updated by ${admin.email}: ${updatedKeys.join(", ")}`);

    const refreshedList = await db
      .select()
      .from(siteSettings)
      .orderBy(asc(siteSettings.category), asc(siteSettings.key));

    return NextResponse.json({
      success: true,
      updatedKeys,
      settings: refreshedList,
    });
  } catch (error: any) {
    log.error("Admin site settings update error", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update site settings" },
      { status: 500 }
    );
  }
}
