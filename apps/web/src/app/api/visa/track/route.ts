import { NextResponse } from "next/server";
import { db, visaApplications } from "@travel/db";
import { eq, and } from "drizzle-orm";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export async function GET(req: Request) {
  try {
    // 1. Rate Limiting to prevent brute-force enumeration attacks
    const ip = getClientIp(req);
    const rl = checkRateLimit(`track_lookup_${ip}`, { limit: 20, windowMs: 60 * 1000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many tracking lookups. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(req.url);
    const ref = searchParams.get("ref")?.trim();
    const email = searchParams.get("email")?.trim().toLowerCase();

    // 2. Strict Dual-Factor Requirement (Reference + Email) to protect personal data
    if (!ref || !email) {
      return NextResponse.json(
        { error: "Both Application Reference (e.g. AZV-123456) and Email address are required to protect applicant privacy." },
        { status: 400 }
      );
    }

    const whereClause = and(
      eq(visaApplications.applicationNumber, ref.toUpperCase()),
      eq(visaApplications.email, email)
    );

    const [found] = await db
      .select({
        id: visaApplications.id,
        applicationNumber: visaApplications.applicationNumber,
        visaType: visaApplications.visaType,
        status: visaApplications.status,
        nationality: visaApplications.nationality,
        arrivalDate: visaApplications.arrivalDate,
        surname: visaApplications.surname,
        givenNames: visaApplications.givenNames,
        email: visaApplications.email,
        totalAmount: visaApplications.totalAmount,
        paymentStatus: visaApplications.paymentStatus,
        asanApplicationId: visaApplications.asanApplicationId,
        evisaPdfUrl: visaApplications.evisaPdfUrl,
        createdAt: visaApplications.createdAt,
        updatedAt: visaApplications.updatedAt,
      })
      .from(visaApplications)
      .where(whereClause);

    if (!found) {
      return NextResponse.json(
        { error: "No visa application found with these details. Please verify your reference number and email address." },
        { status: 404 }
      );
    }

    return NextResponse.json({ application: found });
  } catch (error: any) {
    console.error("[visa track error]:", error);
    return NextResponse.json(
      { error: "Failed to look up visa application." },
      { status: 500 }
    );
  }
}
