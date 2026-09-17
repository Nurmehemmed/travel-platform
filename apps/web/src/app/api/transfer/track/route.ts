import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { transferService } from "@/services/transfer.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  // Rate limiting: 15 requests per minute per IP to protect against enumeration attacks
  const clientIp = getClientIp(req);
  const rateLimit = checkRateLimit(`track_transfer_${clientIp}`, {
    limit: 15,
    windowMs: 60 * 1000,
  });

  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Too many tracking attempts. Please wait a minute and try again." },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
        },
      }
    );
  }

  const url = new URL(req.url);
  const ref = url.searchParams.get("ref")?.trim();
  const email = url.searchParams.get("email")?.trim();

  // Dual-factor requirement: both booking reference AND customer email must match
  if (!ref || !email) {
    return NextResponse.json(
      { error: "Please provide both your booking reference and email address." },
      { status: 400 }
    );
  }

  try {
    const booking = await transferService.getByReferenceAndEmail(ref, email);

    if (!booking) {
      return NextResponse.json(
        { error: "No booking found matching that reference and email address." },
        { status: 404 }
      );
    }

    return NextResponse.json(booking);
  } catch (error) {
    console.error("[Transfer Track API error]:", error);
    return NextResponse.json(
      { error: "An error occurred while looking up your booking." },
      { status: 500 }
    );
  }
}
