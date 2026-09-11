import { NextResponse } from "next/server";
import { db, bookings, users, packages } from "@travel/db";
import { eq, desc, sql } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const list = await db
      .select({
        id: bookings.id,
        travelerCount: bookings.travelerCount,
        totalPrice: bookings.totalPrice,
        status: bookings.status,
        bookedAt: bookings.bookedAt,
        userId: bookings.userId,
        userName: users.name,
        userEmail: users.email,
        tourTitle: packages.title,
        tourId: packages.id,
      })
      .from(bookings)
      .leftJoin(users, eq(bookings.userId, users.id))
      .leftJoin(
        sql`availability_slots`,
        sql`${bookings.slotId} = availability_slots.id`
      )
      .leftJoin(
        packages,
        sql`availability_slots.package_id = ${packages.id}`
      )
      .orderBy(desc(bookings.bookedAt));

    return NextResponse.json({ bookings: list });
  } catch (error: any) {
    console.error("[admin bookings get error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Booking ID and new status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "confirmed", "cancelled", "refunded"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Status must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(bookings)
      .set({ status: status as any })
      .where(eq(bookings.id, id))
      .returning();

    return NextResponse.json({ success: true, booking: updated });
  } catch (error: any) {
    console.error("[admin bookings patch error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update booking status" },
      { status: 500 }
    );
  }
}
