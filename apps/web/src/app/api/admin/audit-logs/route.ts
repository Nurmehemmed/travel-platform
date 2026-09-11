import { NextResponse } from "next/server";
import { db, auditLogs } from "@travel/db";
import { and, desc, eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";

const log = logger.withContext({ route: "/api/admin/audit-logs" });

export async function GET(req: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      log.warn("Unauthorized attempt to access audit logs");
      return NextResponse.json(
        { error: "Unauthorized: Admin privileges required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const entityType = searchParams.get("entityType");
    const entityId = searchParams.get("entityId");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);

    const conditions = [];
    if (entityType) {
      conditions.push(eq(auditLogs.entityType, entityType));
    }
    if (entityId) {
      conditions.push(eq(auditLogs.entityId, entityId));
    }

    const query = db
      .select()
      .from(auditLogs)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(auditLogs.createdAt))
      .limit(limit)
      .offset(offset);

    const rows = await query;

    return NextResponse.json({ logs: rows, count: rows.length });
  } catch (error) {
    log.error("Failed to query audit logs", error);
    return NextResponse.json(
      { error: "Internal server error fetching audit logs" },
      { status: 500 }
    );
  }
}
