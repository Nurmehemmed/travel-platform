import { NextResponse } from "next/server";
import { validateBotProtection } from "@/lib/anti-bot";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { visaService } from "@/services/visa.service";

export async function POST(req: Request) {
  try {
    // 1. Rate limiting: max 10 applications per 10 minutes per IP
    const ip = getClientIp(req);
    const rl = checkRateLimit(`visa_apply_${ip}`, { limit: 10, windowMs: 10 * 60 * 1000 });
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many visa application requests from your connection. Please wait a few minutes." },
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

    // 3. Payload size guard (max 7MB for passport scan)
    if (body.passportScanUrl && typeof body.passportScanUrl === "string" && body.passportScanUrl.length > 7 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Passport image file is too large. Maximum size is 5MB." },
        { status: 413 }
      );
    }

    // 4. Delegate core domain validation & creation to VisaService
    const result = await visaService.createApplication({
      ...body,
      clientIp: ip,
    });

    return NextResponse.json({
      success: true,
      applicationNumber: result.applicationNumber,
      applicationId: result.applicationId,
      paymentUrl: result.paymentUrl,
      isMockPayment: result.isMockPayment,
      message: "Application initiated. Redirecting to payment...",
    });
  } catch (error: any) {
    logger.error("Visa apply submission error", error);
    const isClientError = error?.message?.includes("valid") ||
      error?.message?.includes("required") ||
      error?.message?.includes("eligible") ||
      error?.message?.includes("visa-free");

    return NextResponse.json(
      { error: error?.message || "Failed to submit visa application. Please try again." },
      { status: isClientError ? 400 : 500 }
    );
  }
}
