import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { esimService } from "@/services/esim.service";

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);
    const rateCheck = checkRateLimit(`esim_order_${clientIp}`, {
      limit: 10,
      windowMs: 60 * 1000,
    });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = await req.json();

    const result = await esimService.createOrder({
      ...body,
      clientIp,
    });

    return NextResponse.json({
      success: true,
      orderNumber: result.orderNumber,
      order: result.order,
      plan: result.plan,
      paymentUrl: result.paymentUrl,
      payriffOrderId: result.payriffOrderId,
      isMockPayment: result.isMockPayment,
      message: "eSIM order received successfully",
    });
  } catch (error: any) {
    logger.error("Error creating eSIM order", error);
    const isClientError = error?.message?.includes("required") || error?.message?.includes("valid");
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process eSIM order" },
      { status: isClientError ? 400 : 500 }
    );
  }
}
