import { NextResponse } from "next/server";
import { db, destinations, packages } from "@travel/db";
import { desc, eq, sql } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const list = await db
      .select({
        id: destinations.id,
        name: destinations.name,
        country: destinations.country,
        slug: destinations.slug,
        heroImageUrl: destinations.heroImageUrl,
        createdAt: destinations.createdAt,
        tourCount: sql<number>`(SELECT COUNT(*) FROM packages WHERE packages.destination_id = destinations.id)`,
      })
      .from(destinations)
      .orderBy(desc(destinations.createdAt));

    return NextResponse.json({ destinations: list });
  } catch (error: any) {
    console.error("[admin destinations get error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch destinations" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const body = await request.json();
    const { name, country = "Azerbaijan", heroImageUrl, customSlug } = body;

    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Destination name is required" },
        { status: 400 }
      );
    }

    const baseSlug = String(customSlug || name)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-") || "destination";

    // Ensure slug uniqueness
    let slug = baseSlug;
    const existing = await db
      .select({ id: destinations.id, slug: destinations.slug })
      .from(destinations)
      .where(eq(destinations.slug, slug));

    if (existing.length > 0) {
      slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    const [newDest] = await db
      .insert(destinations)
      .values({
        name: name.trim(),
        country: country?.trim() || "Azerbaijan",
        slug,
        heroImageUrl:
          heroImageUrl?.trim() ||
          "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      })
      .returning();

    return NextResponse.json({
      success: true,
      destination: { ...newDest, tourCount: 0 },
    });
  } catch (error: any) {
    console.error("[admin destinations post error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create destination" },
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
    const { id, name, country, slug: inputSlug, heroImageUrl } = body;

    if (!id) {
      return NextResponse.json({ error: "Destination ID is required" }, { status: 400 });
    }

    const updateData: Record<string, any> = {};
    if (name !== undefined) updateData.name = name.trim();
    if (country !== undefined) updateData.country = country.trim();
    if (heroImageUrl !== undefined) updateData.heroImageUrl = heroImageUrl.trim();
    if (inputSlug !== undefined) {
      updateData.slug = String(inputSlug)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-");
    }

    const [updated] = await db
      .update(destinations)
      .set(updateData)
      .where(eq(destinations.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    // Compute tour count
    const [countRes] = await db
      .select({
        count: sql<number>`(SELECT COUNT(*) FROM packages WHERE packages.destination_id = ${id})`,
      })
      .from(destinations)
      .where(eq(destinations.id, id));

    return NextResponse.json({
      success: true,
      destination: { ...updated, tourCount: Number(countRes?.count || 0) },
    });
  } catch (error: any) {
    console.error("[admin destinations patch error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update destination" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Destination ID is required" }, { status: 400 });
    }

    // Check if any active packages link to this destination
    const linkedTours = await db
      .select({ id: packages.id, title: packages.title })
      .from(packages)
      .where(eq(packages.destinationId, id));

    if (linkedTours.length > 0) {
      return NextResponse.json(
        {
          error: `Cannot delete destination because ${linkedTours.length} tour(s) are currently attached to it ("${linkedTours[0]?.title}"). Please reassign or delete these tours first.`,
        },
        { status: 400 }
      );
    }

    const [deleted] = await db
      .delete(destinations)
      .where(eq(destinations.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Destination not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    console.error("[admin destinations delete error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete destination" },
      { status: 500 }
    );
  }
}
