import { NextResponse } from "next/server";
import { db, transferBookings, recordAuditLog } from "@travel/db";
import { eq } from "drizzle-orm";
import { sendTelegramTransferAlert } from "@/lib/telegram";
import { createPayriffOrder } from "@/lib/payriff";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import {
  generateTransferRef,
  getZoneById,
  getVehicleConfig,
  calculateTransferPrice,
  calculateRoundTripPrice,
  getAirportByCode,
} from "@/lib/transfer-zones";

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

    const {
      direction,
      airport,
      zoneId,
      dropoffAddress,
      vehicleClass,
      flightNumber,
      flightDate,
      flightTime,
      returnFlightNumber,
      returnDate,
      returnTime,
      passengerName,
      passengerCount,
      phoneNumber,
      email,
      luggageNotes,
      paymentMethod = "online",
      userId,
    } = body;

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 3. Required field validation
    if (
      !direction ||
      !airport ||
      !zoneId ||
      !dropoffAddress ||
      !vehicleClass ||
      !flightNumber ||
      !flightDate ||
      !flightTime ||
      !passengerName ||
      !passengerCount ||
      !phoneNumber ||
      !email
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled in." },
        { status: 400 }
      );
    }

    // 4. Round trip extra validation
    if (direction === "round_trip" && (!returnFlightNumber || !returnDate || !returnTime)) {
      return NextResponse.json(
        { error: "Return flight details are required for round-trip bookings." },
        { status: 400 }
      );
    }

    // 5. Resolve zone + pricing
    const zone = getZoneById(zoneId);
    if (!zone) {
      return NextResponse.json({ error: "Invalid transfer zone selected." }, { status: 400 });
    }

    const vehicle = getVehicleConfig(vehicleClass);
    if (!vehicle) {
      return NextResponse.json({ error: "Invalid vehicle class selected." }, { status: 400 });
    }

    const airportInfo = getAirportByCode(airport);

    let pricing: { basePrice: number; totalAmount: number } | null;

    if (zone.isCustom) {
      // Custom destination — use placeholder; admin will quote
      pricing = { basePrice: 0, totalAmount: 0 };
    } else if (direction === "round_trip") {
      pricing = calculateRoundTripPrice(zone, vehicleClass);
    } else {
      pricing = calculateTransferPrice(zone, vehicleClass);
    }

    if (!pricing) {
      return NextResponse.json({ error: "Unable to calculate price for this route." }, { status: 400 });
    }

    // 6. Generate booking reference
    const bookingNumber = generateTransferRef();
    const cleanEmail = String(email).trim().toLowerCase();

    // 7. If online payment, initialize payment session FIRST before creating DB record
    let payriffResult: any = null;
    if (paymentMethod === "online" && !zone.isCustom) {
      payriffResult = await createPayriffOrder({
        applicationNumber: bookingNumber,
        amount: pricing.totalAmount,
        currency: "USD",
        description: `Airport Transfer ${direction} — ${zone.name} (${vehicleClass})`,
        email: cleanEmail,
      });
    }

    // 8. Insert DB record
    await db.insert(transferBookings).values({
      bookingNumber,
      userId: userId || null,
      direction,
      airport,
      pickupZone: zone.name,
      dropoffAddress: String(dropoffAddress).trim(),
      distanceKm: String(zone.distanceKm),
      vehicleClass,
      basePrice: String(pricing.basePrice.toFixed(2)),
      totalAmount: String(pricing.totalAmount.toFixed(2)),
      flightNumber: String(flightNumber).trim().toUpperCase(),
      flightDate,
      flightTime,
      returnFlightNumber: returnFlightNumber ? String(returnFlightNumber).trim().toUpperCase() : null,
      returnDate: returnDate || null,
      returnTime: returnTime || null,
      passengerName: String(passengerName).trim(),
      passengerCount: Number(passengerCount),
      phoneNumber: String(phoneNumber).trim(),
      email: cleanEmail,
      luggageNotes: luggageNotes ? String(luggageNotes).trim() : null,
      paymentMethod: zone.isCustom ? "on_arrival" : paymentMethod,
      paymentStatus: (paymentMethod === "on_arrival" || zone.isCustom) ? "on_arrival" : "pending",
      status: "pending",
      payriffOrderId: payriffResult?.orderId || null,
    });

    // 9. Audit log
    await recordAuditLog({
      entityType: "transfer",
      entityId: bookingNumber,
      action: "transfer.booked",
      actorEmail: cleanEmail,
      actorRole: "customer",
      metadata: {
        direction,
        airport,
        zone: zone.name,
        vehicleClass,
        flightNumber,
        flightDate,
        totalAmount: pricing.totalAmount,
        paymentMethod: zone.isCustom ? "on_arrival" : paymentMethod,
        hasPayriffOrder: !!payriffResult?.orderId,
      },
    });

    logger.info("transfer_booked", {
      bookingNumber,
      direction,
      airport,
      vehicleClass,
      paymentMethod,
      totalAmount: pricing.totalAmount,
    });

    // 10. Handle on-arrival or custom quote
    if (paymentMethod === "on_arrival" || zone.isCustom) {
      // Fire Telegram alert immediately (no payment required yet)
      sendTelegramTransferAlert({
        bookingNumber,
        direction,
        airport: airportInfo?.fullName ?? airport,
        pickupZone: zone.name,
        dropoffAddress: String(dropoffAddress).trim(),
        vehicleClass,
        flightNumber: String(flightNumber).trim().toUpperCase(),
        flightDate,
        flightTime,
        returnFlightNumber: returnFlightNumber || undefined,
        returnDate: returnDate || undefined,
        passengerName: String(passengerName).trim(),
        passengerCount: Number(passengerCount),
        phoneNumber: String(phoneNumber).trim(),
        email: cleanEmail,
        totalAmount: pricing.totalAmount,
        paymentMethod: zone.isCustom ? "on_arrival" : paymentMethod,
      }).catch(console.error);

      return NextResponse.json({
        success: true,
        bookingNumber,
        paymentMethod: zone.isCustom ? "on_arrival" : paymentMethod,
        totalAmount: pricing.totalAmount,
        isCustomZone: zone.isCustom,
        trackUrl: `/transfer/track?ref=${encodeURIComponent(bookingNumber)}&email=${encodeURIComponent(cleanEmail)}`,
      });
    }

    // 11. Online payment return
    return NextResponse.json({
      success: true,
      bookingNumber,
      paymentMethod: "online",
      totalAmount: pricing.totalAmount,
      isCustomZone: false,
      orderId: payriffResult.orderId,
      paymentUrl: payriffResult.paymentUrl,
      isMock: payriffResult.isMock,
      trackUrl: `/transfer/track?ref=${encodeURIComponent(bookingNumber)}&email=${encodeURIComponent(cleanEmail)}`,
    });

  } catch (error) {
    logger.error("transfer_book_error", { error: String(error) });
    console.error("[Transfer Book API error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
