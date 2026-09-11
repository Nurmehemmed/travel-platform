import { db } from "./client";
import { auditLogs } from "./schema";

export interface CreateAuditLogParams {
  entityType: "visa" | "booking" | "payment" | "auth" | "user" | "tour" | "system";
  entityId: string;
  action: string;
  actorEmail?: string | null;
  actorRole?: "admin" | "customer" | "system";
  actorType?: "admin" | "customer" | "system";
  ipAddress?: string | null;
  metadata?: Record<string, any> | null;
}

/**
 * Record an audit log event into Neon Postgres.
 * Designed to fail gracefully without disrupting the primary business transaction.
 */
export async function recordAuditLog(params: CreateAuditLogParams) {
  try {
    const role = params.actorRole || params.actorType || "system";
    const combinedMetadata = {
      ...(params.metadata || {}),
      ...(params.ipAddress ? { ipAddress: params.ipAddress } : {}),
    };

    const [entry] = await db
      .insert(auditLogs)
      .values({
        entityType: params.entityType,
        entityId: params.entityId,
        action: params.action,
        actorEmail: params.actorEmail ?? null,
        actorRole: role,
        metadata: Object.keys(combinedMetadata).length > 0 ? combinedMetadata : null,
      })
      .returning();
    return entry;
  } catch (error) {
    // Audit failure shouldn't crash the user transaction
    console.error("[audit log failure]:", error);
    return null;
  }
}
