import { NextResponse } from "next/server";
import { db, visaApplications } from "@travel/db";
import { desc, eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const list = await db
      .select()
      .from(visaApplications)
      .orderBy(desc(visaApplications.createdAt));

    return NextResponse.json({ visas: list });
  } catch (error: any) {
    console.error("[admin visas get error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch visa applications" },
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
    const { id, status, asanApplicationId, evisaPdfUrl, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ error: "Application ID is required" }, { status: 400 });
    }

    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (status !== undefined) updateData.status = status;
    if (asanApplicationId !== undefined) updateData.asanApplicationId = asanApplicationId;
    if (evisaPdfUrl !== undefined) updateData.evisaPdfUrl = evisaPdfUrl;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const [updated] = await db
      .update(visaApplications)
      .set(updateData)
      .where(eq(visaApplications.id, id))
      .returning();

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    console.error("[admin visas patch error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update visa application" },
      { status: 500 }
    );
  }
}
