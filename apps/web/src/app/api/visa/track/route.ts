import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { visaService } from "@/services/visa.service";

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

    const found = await visaService.getByReferenceAndEmail(ref, email);

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
