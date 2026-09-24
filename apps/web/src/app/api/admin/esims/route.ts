import { NextResponse } from "next/server";
import { db, esimOrders, recordAuditLog } from "@travel/db";
import { desc, eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";

const log = logger.withContext({ route: "/api/admin/esims" });

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      log.warn("Unauthorized attempt to fetch admin eSIM orders");
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const list = await db
      .select()
      .from(esimOrders)
      .orderBy(desc(esimOrders.createdAt));

    return NextResponse.json({ orders: list });
  } catch (error: any) {
    log.error("Failed to fetch eSIM orders", error);
    return NextResponse.json(
      { error: "Failed to fetch eSIM orders" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      log.warn("Unauthorized attempt to update admin eSIM orders");
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, paymentStatus, qrCodeUrl, costPriceUsd, commissionUsd, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const updated = await db.transaction(async (tx) => {
      const [order] = await tx
        .update(esimOrders)
        .set({
          ...(status ? { status } : {}),
          ...(paymentStatus ? { paymentStatus } : {}),
          ...(qrCodeUrl !== undefined ? { qrCodeUrl } : {}),
          ...(costPriceUsd !== undefined ? { costPriceUsd: String(costPriceUsd) } : {}),
          ...(commissionUsd !== undefined ? { commissionUsd: String(commissionUsd) } : {}),
          ...(adminNotes !== undefined ? { adminNotes } : {}),
          updatedAt: new Date(),
        })
        .where(eq(esimOrders.id, id))
        .returning();

      if (order) {
        await recordAuditLog(
          {
            entityType: "esim" as any,
            entityId: order.orderNumber,
            action: "esim_order_updated",
            actorEmail: admin.email || "admin",
            actorRole: "admin",
            metadata: {
              status,
              paymentStatus,
              qrCodeUrl: qrCodeUrl ? "updated" : undefined,
              costPriceUsd,
              commissionUsd,
            },
          },
          tx
        );
      }

      return order;
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    log.error("Failed to update eSIM order", error);
    return NextResponse.json(
      { error: "Failed to update eSIM order" },
      { status: 500 }
    );
  }
}
