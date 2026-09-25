import { NextResponse } from "next/server";
import { db, siteSettings } from "@travel/db";
import { logger } from "@/lib/logger";
import { COMPANY_CONTACT } from "@/lib/constants";
import { CURRENT_BRAND } from "@/lib/brand";

const log = logger.withContext({ route: "/api/settings" });

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const rows = await db.select().from(siteSettings);
    const settingsMap: Record<string, any> = {};

    for (const r of rows) {
      settingsMap[r.key] = r.value;
    }

    const rawWhatsapp = String(settingsMap["contact_whatsapp"] || COMPANY_CONTACT.whatsappPhone);
    const cleanWhatsapp = rawWhatsapp.replace(/\D/g, "");

    const publicConfig = {
      contact: {
        whatsappPhone: rawWhatsapp,
        whatsappClean: cleanWhatsapp,
        whatsappUrl: `https://wa.me/${cleanWhatsapp}`,
        emergencyPhone: String(settingsMap["contact_phone"] || rawWhatsapp),
        supportEmail: String(settingsMap["contact_email"] || CURRENT_BRAND.supportEmail),
        officeAddress: String(settingsMap["contact_address"] || "Nizami Street 48, Baku, Azerbaijan"),
        telegramHandle: String(settingsMap["contact_telegram"] || CURRENT_BRAND.brandKey),
      },
      announcement: {
        active: Boolean(settingsMap["announcement_active"] === true || settingsMap["announcement_active"] === "true"),
        text: String(settingsMap["announcement_text"] || ""),
        link: String(settingsMap["announcement_link"] || "/#tours"),
        badge: String(settingsMap["announcement_badge"] || "Limited Offer"),
      },
      pricing: {
        visaStandard: Number(settingsMap["pricing_visa_standard"]) || 45,
        visaUrgent: Number(settingsMap["pricing_visa_urgent"]) || 85,
        transferSedan: Number(settingsMap["pricing_transfer_sedan"]) || 25,
        transferSuv: Number(settingsMap["pricing_transfer_suv"]) || 40,
        transferMinivan: Number(settingsMap["pricing_transfer_minivan"]) || 40,
        transferSprinter: Number(settingsMap["pricing_transfer_sprinter"]) || 65,
        transferPerKmSedan: Number(settingsMap["pricing_transfer_per_km_sedan"]) || 0.45,
        transferPerKmSuv: Number(settingsMap["pricing_transfer_per_km_suv"]) || 0.60,
        transferPerKmMinivan: Number(settingsMap["pricing_transfer_per_km_minivan"]) || 0.75,
        transferPerKmSprinter: Number(settingsMap["pricing_transfer_per_km_sprinter"]) || 1.10,
        transferRoundTripDiscountPercent: Number(settingsMap["pricing_transfer_roundtrip_discount"]) || 10,
      },
      transferPolicy: {
        cancellationHours: Number(settingsMap["transfer_cancellation_hours"]) || 24,
        waitTimeIntlMins: Number(settingsMap["transfer_wait_time_intl_mins"]) || 60,
        waitTimeDomMins: Number(settingsMap["transfer_wait_time_dom_mins"]) || 30,
        dispatchPhone: String(settingsMap["transfer_dispatch_phone"] || "+994 12 404 78 88"),
        dispatchWhatsapp: String(settingsMap["transfer_dispatch_whatsapp"] || "+994 12 404 78 88"),
      },
      marketing: {
        tripadvisorRating: String(settingsMap["marketing_tripadvisor_rating"] || "4.9"),
        tripadvisorReviews: String(settingsMap["marketing_tripadvisor_reviews"] || "2,400+"),
      },
      operations: {
        floatingWhatsapp: settingsMap["operations_floating_whatsapp"] !== false && settingsMap["operations_floating_whatsapp"] !== "false",
        floatingServices: settingsMap["operations_floating_services"] !== false && settingsMap["operations_floating_services"] !== "false",
        floatingItinerary: settingsMap["operations_floating_itinerary"] !== false && settingsMap["operations_floating_itinerary"] !== "false",
        visaServiceActive: settingsMap["operations_visa_service"] !== false && settingsMap["operations_visa_service"] !== "false",
        transferServiceActive: settingsMap["operations_transfer_service"] !== false && settingsMap["operations_transfer_service"] !== "false",
        vehicleSedanActive: settingsMap["operations_vehicle_sedan_active"] !== false && settingsMap["operations_vehicle_sedan_active"] !== "false",
        vehicleSuvActive: settingsMap["operations_vehicle_suv_active"] !== false && settingsMap["operations_vehicle_suv_active"] !== "false",
        vehicleMinivanActive: settingsMap["operations_vehicle_minivan_active"] !== false && settingsMap["operations_vehicle_minivan_active"] !== "false",
        vehicleSprinterActive: Boolean(settingsMap["operations_vehicle_sprinter_active"] === true || settingsMap["operations_vehicle_sprinter_active"] === "true"),
      },
    };

    return NextResponse.json(publicConfig, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error: any) {
    log.error("Failed to fetch public site settings", error);
    // Return graceful fallback so user interface never breaks
    return NextResponse.json({
      contact: {
        whatsappPhone: COMPANY_CONTACT.whatsappPhone,
        whatsappClean: COMPANY_CONTACT.whatsappNumberClean,
        whatsappUrl: COMPANY_CONTACT.whatsappUrl,
        emergencyPhone: COMPANY_CONTACT.whatsappPhone,
        supportEmail: CURRENT_BRAND.supportEmail,
        officeAddress: "Nizami Street 48, Baku, Azerbaijan",
        telegramHandle: CURRENT_BRAND.brandKey,
      },
      announcement: {
        active: false,
        text: "",
        link: "/#tours",
        badge: "Special Offer",
      },
      pricing: {
        visaStandard: 45,
        visaUrgent: 85,
        transferSedan: 25,
        transferSuv: 40,
        transferMinivan: 40,
        transferSprinter: 65,
        transferPerKmSedan: 0.45,
        transferPerKmSuv: 0.60,
        transferPerKmMinivan: 0.75,
        transferPerKmSprinter: 1.10,
        transferRoundTripDiscountPercent: 10,
      },
      transferPolicy: {
        cancellationHours: 24,
        waitTimeIntlMins: 60,
        waitTimeDomMins: 30,
        dispatchPhone: "+994 12 404 78 88",
        dispatchWhatsapp: "+994 12 404 78 88",
      },
      marketing: {
        tripadvisorRating: "4.9",
        tripadvisorReviews: "2,400+",
      },
      operations: {
        floatingWhatsapp: true,
        floatingServices: true,
        floatingItinerary: true,
        visaServiceActive: true,
        transferServiceActive: true,
        vehicleSedanActive: true,
        vehicleSuvActive: true,
        vehicleMinivanActive: true,
        vehicleSprinterActive: false,
      },
    });
  }
}

