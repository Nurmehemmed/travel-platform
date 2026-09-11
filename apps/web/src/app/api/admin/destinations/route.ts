import { NextResponse } from "next/server";
import { db, destinations } from "@travel/db";
import { desc, sql } from "drizzle-orm";
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
    const { name, country, heroImageUrl } = body;

    if (!name || !country) {
      return NextResponse.json(
        { error: "Name and country are required" },
        { status: 400 }
      );
    }

    const slug = String(name)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-");

    const [newDest] = await db
      .insert(destinations)
      .values({
        name,
        country,
        slug,
        heroImageUrl:
          heroImageUrl ||
          "/images/baku-maiden-tower-wide.jpg",
      })
      .returning();

    return NextResponse.json({ success: true, destination: newDest });
  } catch (error: any) {
    console.error("[admin destinations post error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create destination" },
      { status: 500 }
    );
  }
}
