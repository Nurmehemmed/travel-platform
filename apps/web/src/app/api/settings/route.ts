import { NextResponse } from "next/server";
import { db, siteSettings } from "@travel/db";
import { logger } from "@/lib/logger";
import { COMPANY_CONTACT } from "@/lib/constants";

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
        supportEmail: String(settingsMap["contact_email"] || "info@addmetour.com"),
        officeAddress: String(settingsMap["contact_address"] || "Nizami Street 48, Baku, Azerbaijan"),
        telegramHandle: String(settingsMap["contact_telegram"] || "addmetour"),
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
        transferMinivan: Number(settingsMap["pricing_transfer_minivan"]) || 40,
        transferSprinter: Number(settingsMap["pricing_transfer_sprinter"]) || 65,
      },
      marketing: {
        tripadvisorRating: String(settingsMap["marketing_tripadvisor_rating"] || "4.9"),
        tripadvisorReviews: String(settingsMap["marketing_tripadvisor_reviews"] || "2,400+"),
      },
      operations: {
        floatingWhatsapp: settingsMap["operations_floating_whatsapp"] !== false && settingsMap["operations_floating_whatsapp"] !== "false",
        visaServiceActive: settingsMap["operations_visa_service"] !== false && settingsMap["operations_visa_service"] !== "false",
        transferServiceActive: settingsMap["operations_transfer_service"] !== false && settingsMap["operations_transfer_service"] !== "false",
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
        supportEmail: "info@addmetour.com",
        officeAddress: "Nizami Street 48, Baku, Azerbaijan",
        telegramHandle: "addmetour",
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
        transferMinivan: 40,
        transferSprinter: 65,
      },
      marketing: {
        tripadvisorRating: "4.9",
        tripadvisorReviews: "2,400+",
      },
      operations: {
        floatingWhatsapp: true,
        visaServiceActive: true,
        transferServiceActive: true,
      },
    });
  }
}
