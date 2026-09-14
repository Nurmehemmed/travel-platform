import { NextResponse } from "next/server";
import { db, packages, destinations } from "@travel/db";
import { eq, desc } from "drizzle-orm";

// Always serve real-time dynamic tour catalog without stale edge caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const list = await db
      .select({
        id: packages.id,
        title: packages.title,
        slug: packages.slug,
        overview: packages.overview,
        coverImageUrl: packages.coverImageUrl,
        durationDays: packages.durationDays,
        durationNights: packages.durationNights,
        basePrice: packages.basePrice,
        promoPrice: packages.promoPrice,
        ratingAvg: packages.ratingAvg,
        reviewCount: packages.reviewCount,
        isActive: packages.isActive,
        destinationName: destinations.name,
      })
      .from(packages)
      .leftJoin(destinations, eq(packages.destinationId, destinations.id))
      .where(eq(packages.isActive, true))
      .orderBy(desc(packages.createdAt));

    // Map into frontend landing page tour format
    const formatted = list.map((pkg, idx) => {
      const isPromo = Boolean(pkg.promoPrice && parseFloat(pkg.promoPrice) > 0);
      const price = isPromo ? parseFloat(pkg.promoPrice!) : parseFloat(pkg.basePrice);
      const originalPrice = isPromo ? parseFloat(pkg.basePrice) : null;

      let category = "Day Trip";
      if (pkg.durationDays > 1) {
        category = "Overnight";
      } else if (pkg.destinationName?.toLowerCase().includes("baku")) {
        category = "City";
      } else if (
        pkg.title.toLowerCase().includes("mountain") ||
        pkg.title.toLowerCase().includes("highland") ||
        pkg.overview.toLowerCase().includes("mountain")
      ) {
        category = "Adventure";
      }

      return {
        id: pkg.id,
        badge:
          idx === 0
            ? "New Experience"
            : pkg.reviewCount > 150
            ? "Best Seller"
            : pkg.reviewCount > 80
            ? "Popular"
            : null,
        badgeColor:
          idx === 0
            ? "bg-[#0f3460] text-white"
            : pkg.reviewCount > 150
            ? "bg-[#f59e0b] text-[#061225] font-bold"
            : "bg-[#0284c7] text-white",
        image:
          pkg.coverImageUrl ||
          "/images/baku-old-city.jpg",
        tags: [pkg.destinationName || "Azerbaijan", category, "Guided"],
        rating: parseFloat(pkg.ratingAvg) || 5.0,
        reviews: pkg.reviewCount || 0,
        title: pkg.title,
        desc: pkg.overview,
        duration: pkg.durationDays === 1 ? "1 day" : `${pkg.durationDays} days`,
        groupSize: "Up to 10",
        originalPrice,
        price,
        category,
      };
    });

    return NextResponse.json(
      { tours: formatted },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error: any) {
    console.error("[tours public get error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch public tours" },
      { status: 500 }
    );
  }
}
