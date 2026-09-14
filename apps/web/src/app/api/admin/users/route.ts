import { NextResponse } from "next/server";
import { db, users, bookings, recordAuditLog } from "@travel/db";
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
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        image: users.image,
        createdAt: users.createdAt,
        bookingCount: sql<number>`(SELECT COUNT(*) FROM bookings WHERE bookings.user_id = users.id)`,
      })
      .from(users)
      .orderBy(desc(users.createdAt));

    return NextResponse.json({ users: list });
  } catch (error: any) {
    console.error("[admin users get error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch users" },
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
    const { id, role } = body;

    if (!id || !role) {
      return NextResponse.json(
        { error: "User ID and new role are required" },
        { status: 400 }
      );
    }

    const validRoles = ["admin", "agent", "customer"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: `Role must be one of: ${validRoles.join(", ")}` },
        { status: 400 }
      );
    }

    // Check target user exists
    const [targetUser] = await db
      .select({ id: users.id, role: users.role, email: users.email })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Last-admin safety guard: never allow demoting the last active administrator
    if (targetUser.role === "admin" && role !== "admin") {
      const adminCountResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(users)
        .where(eq(users.role, "admin"));
      const adminCount = Number(adminCountResult[0]?.count || 0);

      if (adminCount <= 1) {
        return NextResponse.json(
          { error: "Action blocked: Cannot demote the last remaining administrator on the platform." },
          { status: 400 }
        );
      }
    }

    const [updated] = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
      });

    if (updated) {
      await recordAuditLog({
        entityType: "user",
        entityId: updated.id,
        action: `user.role_changed_to_${role}`,
        actorEmail: admin.email,
        actorRole: "admin",
        metadata: {
          targetEmail: updated.email,
          previousRole: targetUser.role,
          newRole: role,
        },
      });
    }

    return NextResponse.json({ success: true, user: updated });
  } catch (error: any) {
    console.error("[admin users patch error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update user role" },
      { status: 500 }
    );
  }
}
