import { NextResponse } from "next/server";
import { db, users, packages, bookings } from "@travel/db";
import { eq, sql, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized access: Admin privileges required" }, { status: 401 });
    }

    // 1. Total revenue from confirmed bookings
    const [revResult] = await db
      .select({
        total: sql<string>`COALESCE(SUM(total_price), 0)`,
      })
      .from(bookings)
      .where(eq(bookings.status, "confirmed"));

    // 2. Booking counts
    const [bookingCountResult] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(bookings);

    const [pendingCountResult] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(bookings)
      .where(eq(bookings.status, "pending"));

    // 3. Active tours count
    const [toursCountResult] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(packages)
      .where(eq(packages.isActive, true));

    // 4. Total users count
    const [usersCountResult] = await db
      .select({ count: sql<number>`COUNT(*)` })
      .from(users);

    // 5. Recent 6 bookings with package & user info
    const recentBookings = await db
      .select({
        id: bookings.id,
        travelerCount: bookings.travelerCount,
        totalPrice: bookings.totalPrice,
        status: bookings.status,
        bookedAt: bookings.bookedAt,
        userName: users.name,
        userEmail: users.email,
        tourTitle: packages.title,
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
      .orderBy(desc(bookings.bookedAt))
      .limit(6);

    return NextResponse.json({
      stats: {
        totalRevenue: Number(revResult?.total || 0),
        totalBookings: Number(bookingCountResult?.count || 0),
        pendingBookings: Number(pendingCountResult?.count || 0),
        activeTours: Number(toursCountResult?.count || 0),
        totalUsers: Number(usersCountResult?.count || 0),
      },
      recentBookings: recentBookings || [],
    });
  } catch (error: any) {
    console.error("[admin stats error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch admin stats" },
      { status: 500 }
    );
  }
}
