import { NextResponse } from "next/server";
import { db, customItineraries } from "@travel/db";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logger";

const log = logger.withContext({ route: "/api/itinerary/lookup" });

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref") || searchParams.get("code");

    if (!ref) {
      return NextResponse.json(
        { error: "Reference code parameter is required" },
        { status: 400 }
      );
    }

    const cleanRef = ref.trim().toUpperCase();

    const record = await db.query.customItineraries.findFirst({
      where: eq(customItineraries.referenceCode, cleanRef),
    });

    if (!record) {
      return NextResponse.json(
        { success: false, error: "Custom itinerary not found for the given reference code" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      itinerary: record,
    });
  } catch (error: any) {
    log.error("Failed to lookup custom itinerary", error);
    return NextResponse.json(
      { success: false, error: "Failed to query itinerary record" },
      { status: 500 }
    );
  }
}
