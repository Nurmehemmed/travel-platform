import { NextResponse } from "next/server";
import { db, customItineraries, recordAuditLog } from "@travel/db";
import { desc, eq } from "drizzle-orm";
import { notifyTelegram } from "@/lib/telegram";
import { requireAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const log = logger.withContext({ route: "/api/itinerary/create" });

function generateItineraryReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = new Date().getFullYear();
  return `ITN-${year}-${random}`;
}

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
    const {
      durationDays,
      arrivalDate,
      adults,
      children,
      destinations,
      hotelTier,
      vehicleClass,
      estimatedPriceUSD,
      currency,
      customer,
    } = body;

    const travelerName = customer?.fullName?.trim();
    const email = customer?.email?.trim();
    const phoneNumber = customer?.phone?.trim();

    if (!travelerName || !email || !phoneNumber) {
      return NextResponse.json(
        { error: "Traveler full name, email, and phone number are required." },
        { status: 400 }
      );
    }

    const duration = Math.max(1, Math.min(30, Number(durationDays) || 5));
    const adultCount = Math.max(1, Math.min(50, Number(adults) || 2));
    const childCount = Math.max(0, Math.min(20, Number(children) || 0));
    const priceUsd = Math.max(0, parseFloat(String(estimatedPriceUSD)) || 0);

    const arrivalDateStr: string =
      (typeof arrivalDate === "string" && arrivalDate.length >= 10
        ? arrivalDate.split("T")[0]
        : new Date().toISOString().split("T")[0]) || new Date().toISOString().slice(0, 10);

    const referenceCode = generateItineraryReference();

    const selectedDests: string[] = Array.isArray(destinations) && destinations.length > 0
      ? destinations
      : ["Baku Old City & Modern Marvels"];

    // 2. Insert into Neon PostgreSQL database via Drizzle ORM
    const [created] = await db
      .insert(customItineraries)
      .values({
        referenceCode,
        travelerName,
        email,
        phoneNumber,
        durationDays: duration,
        arrivalDate: arrivalDateStr,
        adults: adultCount,
        children: childCount,
        hotelTier: hotelTier || "4-Star Comfort",
        vehicleClass: vehicleClass || "Mercedes VIP Van",
        destinations: selectedDests,
        estimatedPriceUsd: String(priceUsd.toFixed(2)),
        currency: currency || "USD",
        specialRequests: customer?.notes || null,
        status: "pending",
      })
      .returning();

    // 3. Record Audit Log
    if (created) {
      await recordAuditLog({
        entityType: "tour",
        entityId: created.referenceCode,
        action: "custom_itinerary_created",
        actorRole: "customer",
        metadata: {
          referenceCode: created.referenceCode,
          travelerName,
          email,
          durationDays: duration,
          arrivalDate: arrivalDateStr,
          estimatedPriceUSD: priceUsd,
          clientIp,
        },
      });

      log.info(`New custom itinerary inquiry saved: ${created.referenceCode}`, {
        referenceCode: created.referenceCode,
        travelerName,
        priceUsd,
      });
    }

    // 4. Dispatch Telegram Notification asynchronously
    const summaryText = `🗺️ *NEW BESPOKE ITINERARY INQUIRY*
━━━━━━━━━━━━━━━━━━━━━━━━━
🔖 *Ref Code:* \`${created?.referenceCode || referenceCode}\`
👤 *Traveler:* ${travelerName}
📱 *Phone/WA:* \`${phoneNumber}\`
✉️ *Email:* ${email}
🏨 *Hotel Tier:* ${hotelTier || "4-Star Comfort"}
🚗 *Vehicle:* ${vehicleClass || "Mercedes VIP Van"}
📅 *Duration:* ${duration} Days (${arrivalDateStr})
👥 *Party:* ${adultCount} Adults${childCount > 0 ? `, ${childCount} Children` : ""}
📍 *Destinations Selected:*
${selectedDests.map((d: string) => `  • ${d}`).join("\n")}
💰 *Estimated Budget:* ~$${priceUsd} USD (${currency || "USD"})
📝 *Special Requests:* ${customer?.notes || "None"}
━━━━━━━━━━━━━━━━━━━━━━━━━`;

    notifyTelegram(summaryText).catch((err) => {
      log.warn("Telegram notification failed", { err: err?.message });
    });

    return NextResponse.json({
      success: true,
      referenceCode: created?.referenceCode || referenceCode,
      itinerary: created,
      message: "Custom itinerary request saved and received successfully",
    });
  } catch (error: any) {
    log.error("Error creating custom itinerary", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process custom itinerary" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const list = await db
      .select()
      .from(customItineraries)
      .orderBy(desc(customItineraries.createdAt));

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

    const updateData: Record<string, any> = {
      updatedAt: new Date(),
    };

    if (status !== undefined) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const [updated] = await db
      .update(customItineraries)
      .set(updateData)
      .where(eq(customItineraries.id, id))
      .returning();

    if (updated) {
      await recordAuditLog({
        entityType: "tour",
        entityId: updated.referenceCode,
        action: status ? `custom_itinerary.status_${status}` : "custom_itinerary.updated",
        actorEmail: admin.email,
        actorRole: "admin",
        metadata: {
          status,
          adminNotes,
        },
      });

      log.info(`Custom itinerary updated: ${updated.referenceCode}`, {
        referenceCode: updated.referenceCode,
        status: updated.status,
      });
    }

    return NextResponse.json({ success: true, itinerary: updated });
  } catch (error: any) {
    log.error("Admin custom itinerary update error", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update custom itinerary" },
      { status: 500 }
    );
  }
}
