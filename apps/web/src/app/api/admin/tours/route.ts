import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { db, packages, destinations } from "@travel/db";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const tourList = await db
      .select({
        id: packages.id,
        title: packages.title,
        slug: packages.slug,
        destinationId: packages.destinationId,
        destinationName: destinations.name,
        destinationCountry: destinations.country,
        overview: packages.overview,
        coverImageUrl: packages.coverImageUrl,
        durationDays: packages.durationDays,
        durationNights: packages.durationNights,
        basePrice: packages.basePrice,
        promoPrice: packages.promoPrice,
        ratingAvg: packages.ratingAvg,
        reviewCount: packages.reviewCount,
        isActive: packages.isActive,
        createdAt: packages.createdAt,
      })
      .from(packages)
      .leftJoin(destinations, eq(packages.destinationId, destinations.id))
      .orderBy(desc(packages.createdAt));

    return NextResponse.json({ tours: tourList });
  } catch (error: any) {
    console.error("[admin tours get error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch tours" },
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
    const {
      title,
      destinationId,
      overview,
      coverImageUrl,
      durationDays,
      durationNights,
      basePrice,
      promoPrice,
    } = body;

    if (!title || !destinationId || !overview || !basePrice) {
      return NextResponse.json(
        { error: "Title, destination, overview, and base price are required" },
        { status: 400 }
      );
    }

    const slug = String(title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") + `-${Date.now().toString().slice(-4)}`;

    const [newTour] = await db
      .insert(packages)
      .values({
        title,
        slug,
        destinationId,
        overview,
        coverImageUrl:
          coverImageUrl ||
          "/images/baku-old-city.jpg",
        durationDays: Number(durationDays) || 1,
        durationNights: Number(durationNights) || 0,
        basePrice: String(basePrice),
        promoPrice: promoPrice ? String(promoPrice) : null,
        ratingAvg: "5.00",
        reviewCount: 0,
        isActive: true,
      })
      .returning();

    try {
      revalidatePath("/");
      revalidatePath("/api/tours");
    } catch (revalErr) {
      console.warn("Tour revalidatePath warning:", revalErr);
    }

    return NextResponse.json({ success: true, tour: newTour });
  } catch (error: any) {
    console.error("[admin tours post error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create tour" },
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
    const { id, isActive, title, basePrice, promoPrice, overview } = body;

    if (!id) {
      return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
    }

    const updateFields: any = {};
    if (typeof isActive === "boolean") updateFields.isActive = isActive;
    if (title) updateFields.title = title;
    if (basePrice) updateFields.basePrice = String(basePrice);
    if (promoPrice !== undefined)
      updateFields.promoPrice = promoPrice ? String(promoPrice) : null;
    if (overview) updateFields.overview = overview;

    const [updated] = await db
      .update(packages)
      .set(updateFields)
      .where(eq(packages.id, id))
      .returning();

    try {
      revalidatePath("/");
      revalidatePath("/api/tours");
    } catch (revalErr) {
      console.warn("Tour revalidatePath warning:", revalErr);
    }

    return NextResponse.json({ success: true, tour: updated });
  } catch (error: any) {
    console.error("[admin tours patch error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update tour" },
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
      return NextResponse.json({ error: "Tour ID is required" }, { status: 400 });
    }

    await db.delete(packages).where(eq(packages.id, id));

    try {
      revalidatePath("/");
      revalidatePath("/api/tours");
    } catch (revalErr) {
      console.warn("Tour revalidatePath warning:", revalErr);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[admin tours delete error]:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete tour" },
      { status: 500 }
    );
  }
}
