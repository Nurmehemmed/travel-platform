import { NextResponse } from "next/server";
import { tourService } from "@/services/tour.service";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const tourId = url.searchParams.get("tourId") || url.searchParams.get("slug");

    if (!tourId) {
      return NextResponse.json({ error: "tourId or slug query parameter is required" }, { status: 400 });
    }

    const departures = await tourService.getTourDepartures(tourId);

    return NextResponse.json(
      { departures },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    logger.error("Failed to fetch tour departures", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch tour departures" },
      { status: 500 }
    );
  }
}
