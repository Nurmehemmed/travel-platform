import { NextResponse } from "next/server";
import { db, siteSettings, recordAuditLog } from "@travel/db";
import { asc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";

const log = logger.withContext({ route: "/api/admin/settings" });

function getSettingMetadata(key: string): { category: string; label: string; description: string } {
  const metadataMap: Record<string, { category: string; label: string; description: string }> = {
    operations_floating_whatsapp: {
      category: "operations",
      label: "Show Floating WhatsApp Widget",
      description: "Toggle floating green WhatsApp button on customer pages",
    },
    operations_floating_services: {
      category: "operations",
      label: "Show Floating Quick Services Dock",
      description: "Toggle bottom-right e-Visa and Airport Transfer pill dock",
    },
    operations_floating_itinerary: {
      category: "operations",
      label: "Show Floating Custom Itinerary Widget",
      description: "Toggle bottom-left Custom Itinerary planner pill",
    },
    operations_visa_service: {
      category: "operations",
      label: "e-Visa Processing Active",
      description: "Kill-switch for electronic visa applications",
    },
    operations_transfer_service: {
      category: "operations",
      label: "Airport Transfer Booking Active",
      description: "Kill-switch for airport transfer reservations",
    },
    contact_whatsapp: {
      category: "contact",
      label: "Primary WhatsApp Number",
      description: "Main WhatsApp number used across the site for instant chat and booking",
    },
    contact_phone: {
      category: "contact",
      label: "Operations Emergency Phone",
      description: "24/7 hotline displayed for urgent guest inquiries",
    },
    contact_email: {
      category: "contact",
      label: "Official Support Email",
      description: "Customer service and inquiry inbox",
    },
    contact_telegram: {
      category: "contact",
      label: "Telegram Username/Channel",
      description: "Telegram handle for guest support",
    },
    contact_address: {
      category: "contact",
      label: "Baku Office Address",
      description: "Physical office address displayed in legal and footer sections",
    },
    announcement_active: {
      category: "announcement",
      label: "Announcement Bar Active",
      description: "Toggle site-wide banner alert across the top of all pages",
    },
    announcement_text: {
      category: "announcement",
      label: "Announcement Text",
      description: "Text displayed in the top banner",
    },
    announcement_badge: {
      category: "announcement",
      label: "Announcement Badge Text",
      description: "Pill label text on the announcement bar",
    },
    announcement_link: {
      category: "announcement",
      label: "Announcement Action Link",
      description: "Target URL when visitors click the announcement bar",
    },
    pricing_visa_standard: {
      category: "pricing",
      label: "Standard eVisa Price (USD)",
      description: "Base price for 3-day standard e-visa processing",
    },
    pricing_visa_urgent: {
      category: "pricing",
      label: "Urgent eVisa Price (USD)",
      description: "Base price for 3-hour fast-track urgent e-visa processing",
    },
    pricing_transfer_sedan: {
      category: "pricing",
      label: "Transfer Sedan Base (USD)",
      description: "Standard sedan base transfer fee",
    },
    pricing_transfer_suv: {
      category: "pricing",
      label: "Transfer SUV Base (USD)",
      description: "Standard SUV base transfer fee",
    },
    pricing_transfer_minivan: {
      category: "pricing",
      label: "Transfer Minivan Base (USD)",
      description: "Minivan (Mercedes Vito) base transfer fee",
    },
    pricing_transfer_sprinter: {
      category: "pricing",
      label: "Transfer Sprinter Base (USD)",
      description: "Sprinter VIP base transfer fee",
    },
    pricing_transfer_per_km_sedan: {
      category: "pricing",
      label: "Sedan Rate per KM ($/km)",
      description: "Distance rate for sedan transfers",
    },
    pricing_transfer_per_km_suv: {
      category: "pricing",
      label: "SUV Rate per KM ($/km)",
      description: "Distance rate for SUV transfers",
    },
    pricing_transfer_per_km_minivan: {
      category: "pricing",
      label: "Minivan Rate per KM ($/km)",
      description: "Distance rate for minivan transfers",
    },
    pricing_transfer_per_km_sprinter: {
      category: "pricing",
      label: "Sprinter Rate per KM ($/km)",
      description: "Distance rate for Sprinter transfers",
    },
    pricing_transfer_roundtrip_discount: {
      category: "pricing",
      label: "Round-Trip Discount (%)",
      description: "Percentage discount applied to both legs of round-trip transfers",
    },
    transfer_cancellation_hours: {
      category: "operations",
      label: "Transfer Free Cancellation Window (Hours)",
      description: "Minimum hours prior to pickup for 100% full refund",
    },
    transfer_wait_time_intl_mins: {
      category: "operations",
      label: "International Flight Free Waiting (Minutes)",
      description: "Complimentary chauffeur waiting time after international flight touchdown",
    },
    transfer_wait_time_dom_mins: {
      category: "operations",
      label: "Domestic / Hotel Free Waiting (Minutes)",
      description: "Complimentary waiting time for domestic flights & hotel pickups",
    },
    transfer_dispatch_phone: {
      category: "contact",
      label: "Transfer Dispatch Emergency Phone",
      description: "Direct operations telephone line for airport chauffeurs & guests",
    },
    transfer_dispatch_whatsapp: {
      category: "contact",
      label: "Transfer Dispatch WhatsApp",
      description: "Direct WhatsApp dispatch number for live flight coordination",
    },
    marketing_tripadvisor_rating: {
      category: "marketing",
      label: "TripAdvisor Rating",
      description: "Rating display on social proof widgets",
    },
    marketing_tripadvisor_reviews: {
      category: "marketing",
      label: "TripAdvisor Review Count",
      description: "Verified review count on social proof widgets",
    },
  };

  if (metadataMap[key]) return metadataMap[key];

  const category = key.startsWith("contact_")
    ? "contact"
    : key.startsWith("pricing_")
    ? "pricing"
    : key.startsWith("announcement_")
    ? "announcement"
    : key.startsWith("operations_")
    ? "operations"
    : key.startsWith("marketing_")
    ? "marketing"
    : "general";

  const label = key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return { category, label, description: `Dynamic ${label} configuration` };
}

export async function GET() {
  try {
    const admin = await requireAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized: Admin privileges required" }, { status: 401 });
    }

    const list = await db
      .select()
      .from(siteSettings)
      .orderBy(asc(siteSettings.category), asc(siteSettings.key));

    return NextResponse.json({ settings: list });
  } catch (error: any) {
    log.error("Failed to fetch admin site settings", error);
    return NextResponse.json(
      { error: "Failed to fetch site settings" },
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
    const updates: Record<string, any> = body.updates || {};

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No settings provided to update" }, { status: 400 });
    }

    const updatedKeys: string[] = [];

    for (const [key, value] of Object.entries(updates)) {
      const meta = getSettingMetadata(key);

      await db
        .insert(siteSettings)
        .values({
          key,
          value,
          category: meta.category,
          label: meta.label,
          description: meta.description,
          updatedAt: new Date(),
          updatedBy: admin.email,
        })
        .onConflictDoUpdate({
          target: siteSettings.key,
          set: {
            value,
            updatedAt: new Date(),
            updatedBy: admin.email,
          },
        });

      updatedKeys.push(key);
    }

    await recordAuditLog({
      entityType: "system",
      entityId: "site_settings",
      action: "settings.updated",
      actorEmail: admin.email,
      actorRole: "admin",
      metadata: {
        updatedKeys,
        updates,
      },
    });

    log.info(`Site settings updated by ${admin.email}: ${updatedKeys.join(", ")}`);

    const refreshedList = await db
      .select()
      .from(siteSettings)
      .orderBy(asc(siteSettings.category), asc(siteSettings.key));

    return NextResponse.json({
      success: true,
      updatedKeys,
      settings: refreshedList,
    });
  } catch (error: any) {
    log.error("Admin site settings update error", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update site settings" },
      { status: 500 }
    );
  }
}

