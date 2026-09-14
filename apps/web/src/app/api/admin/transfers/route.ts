import { NextResponse } from "next/server";
import { db, transferBookings, recordAuditLog } from "@travel/db";
import { desc, eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";

const log = logger.withContext({ route: "/api/admin/transfers" });

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      log.warn("Unauthorized attempt to fetch admin transfers");
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const list = await db
      .select()
      .from(transferBookings)
      .orderBy(desc(transferBookings.createdAt));

    return NextResponse.json({ transfers: list });
  } catch (error: any) {
    log.error("Failed to fetch transfer bookings", error);
    return NextResponse.json(
      { error: "Failed to fetch transfer bookings" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      log.warn("Unauthorized attempt to update admin transfers");
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const body = await req.json();
    const { id, status, paymentStatus, driverName, driverPhone, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ error: "Booking ID is required" }, { status: 400 });
    }

    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (status !== undefined) updateData.status = status;
    if (paymentStatus !== undefined) updateData.paymentStatus = paymentStatus;
    if (driverName !== undefined) updateData.driverName = driverName;
    if (driverPhone !== undefined) updateData.driverPhone = driverPhone;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const [updated] = await db
      .update(transferBookings)
      .set(updateData)
      .where(eq(transferBookings.id, id))
      .returning();

    if (updated) {
      await recordAuditLog({
        entityType: "transfer",
        entityId: updated.bookingNumber,
        action: status ? `transfer.status_${status}` : "transfer.updated",
        actorEmail: admin.email,
        actorRole: "admin",
        metadata: {
          newStatus: status,
          paymentStatus,
          driverName,
          driverPhone,
          adminNotes,
        },
      });

      log.info(`Transfer booking updated by admin: ${updated.bookingNumber}`, {
        bookingNumber: updated.bookingNumber,
        adminEmail: admin.email,
        status: updated.status,
      });
    }

    return NextResponse.json({ success: true, transfer: updated });
  } catch (error: any) {
    log.error("Admin transfer update error", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update transfer booking" },
      { status: 500 }
    );
  }
}
