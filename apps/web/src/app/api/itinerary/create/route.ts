import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { itineraryService } from "@/services/itinerary.service";

const log = logger.withContext({ route: "/api/itinerary/create" });

export async function POST(req: Request) {
  try {
    // 1. Rate limiting
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`itinerary_create_${clientIp}`, {
      limit: 10,
      windowMs: 60 * 1000,
    });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many itinerary requests. Please wait a minute and try again." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    const body = await req.json();

    const result = await itineraryService.createCustomItinerary({
      ...body,
      clientIp,
    });

    return NextResponse.json({
      success: true,
      referenceCode: result.referenceCode,
      itinerary: result.itinerary,
      message: "Custom itinerary request saved and received successfully",
    });
  } catch (error: any) {
    log.error("Error creating custom itinerary", error);
    const isClientError = error?.message?.includes("required") || error?.message?.includes("valid");
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process custom itinerary" },
      { status: isClientError ? 400 : 500 }
    );
  }
}

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const list = await itineraryService.listItineraries();
    return NextResponse.json({ itineraries: list });
  } catch (error: any) {
    log.error("Failed to fetch custom itineraries", error);
    return NextResponse.json(
      { error: "Failed to fetch custom itineraries" },
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
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json({ error: "Itinerary ID is required" }, { status: 400 });
    }

    const updated = await itineraryService.updateItinerary({
      id,
      status,
      adminNotes,
      adminEmail: admin.email,
    });

    return NextResponse.json({ success: true, itinerary: updated });
  } catch (error: any) {
    log.error("Admin custom itinerary update error", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update custom itinerary" },
      { status: 500 }
    );
  }
}
