import { NextResponse } from "next/server";
import { validateBotProtection } from "@/lib/anti-bot";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { transferService } from "@/services/transfer.service";

export async function POST(req: Request) {
  try {
    // 1. Rate limiting: max 10 bookings per 10 minutes per IP
    const ip = getClientIp(req);
    const rl = checkRateLimit(`transfer_book_${ip}`, { limit: 10, windowMs: 10 * 60 * 1000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many booking requests. Please wait a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // 2. Anti-Bot and Fraud Defense Layer
    const botCheck = await validateBotProtection({
      honeypotValue: body.company_website || body.hp_field,
      formStartedAt: body.formStartedAt,
      turnstileToken: body.turnstileToken,
      clientIp: ip,
    });
    if (botCheck.isBot) {
      return NextResponse.json(
        { error: "Automated submission detected. If this is a mistake, please refresh and try again." },
        { status: 403 }
      );
    }

    // 3. Delegate to pure domain TransferService
    const result = await transferService.createBooking({
      ...body,
      clientIp: ip,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    logger.error("transfer_book_error", { error: String(error) });
    console.error("[Transfer Book API error]:", error);

    const isClientError =
      error?.message?.includes("valid") ||
      error?.message?.includes("required") ||
      error?.message?.includes("Invalid") ||
      error?.message?.includes("Unable to calculate price");

    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred. Please try again." },
      { status: isClientError ? 400 : 500 }
    );
  }
}
