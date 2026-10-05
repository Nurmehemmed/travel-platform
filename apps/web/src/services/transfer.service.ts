import { db, transferBookings, recordAuditLog } from "@travel/db";
import { eq, and, desc } from "drizzle-orm";
import { sendTelegramTransferAlert } from "@/lib/telegram";
import { sendTransferConfirmationEmail } from "@/lib/email";
import { createPayriffOrder } from "@/lib/payriff";
import { logger } from "@/lib/logger";
import {
  generateTransferRef,
  getZoneById,
  getVehicleConfig,
  calculateTransferPrice,
  calculateRoundTripPrice,
  getAirportByCode,
  TransferZone,
  VehicleClass,
  AirportCode,
  validateTransferLeadTime,
  validateReturnFlightTime,
} from "@/lib/transfer-zones";
import { calculateTransferPaymentBreakdown } from "@/lib/transfers/policy";
import { isVehicleClassActive } from "@/lib/transfers/vehicles";
import { siteSettings } from "@travel/db";

export interface CreateTransferBookingInput {
  direction: "airport_to_hotel" | "hotel_to_airport" | "round_trip" | "arrival" | "departure";
  airport: string;
  zoneId: string;
  dropoffAddress: string;
  vehicleClass: string;
  flightNumber: string;
  flightDate: string;
  flightTime: string;
  returnFlightNumber?: string | null;
  returnDate?: string | null;
  returnTime?: string | null;
  passengerName: string;
  passengerCount: number | string;
  phoneNumber: string;
  email: string;
  luggageNotes?: string | null;
  femaleDriver?: boolean;
  additionalGuide?: boolean;
  paymentMethod?: "online" | "on_arrival" | "partial_deposit";
  userId?: string | null;
  clientIp?: string | null;
}

export interface TransferPricingResult {
  zone: TransferZone;
  basePrice: number;
  totalAmount: number;
  isCustom: boolean;
}

export function normalizeTransferDirection(
  dir: "airport_to_hotel" | "hotel_to_airport" | "round_trip" | "arrival" | "departure"
): "arrival" | "departure" | "round_trip" {
  if (dir === "airport_to_hotel" || dir === "arrival") return "arrival";
  if (dir === "hotel_to_airport" || dir === "departure") return "departure";
  return "round_trip";
}

export class TransferService {
  /**
   * Validate booking input requirements
   */
  validateBooking(
    input: CreateTransferBookingInput,
    options?: { skipLeadTimeCheck?: boolean }
  ): { valid: boolean; error?: string | undefined } {
    const {
      direction,
      airport,
      zoneId,
      dropoffAddress,
      vehicleClass,
      flightNumber,
      flightDate,
      flightTime,
      passengerName,
      passengerCount,
      phoneNumber,
      email,
      returnFlightNumber,
      returnDate,
      returnTime,
    } = input;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      return { valid: false, error: "Please enter a valid email address." };
    }

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
      return { valid: false, error: "All required fields must be filled in." };
    }

    if (direction === "round_trip" && (!returnFlightNumber || !returnDate || !returnTime)) {
      return { valid: false, error: "Return flight details are required for round-trip bookings." };
    }

    const zone = getZoneById(zoneId);
    if (!zone) {
      return { valid: false, error: "Invalid transfer zone selected." };
    }

    const vehicle = getVehicleConfig(vehicleClass);
    if (!vehicle) {
      return { valid: false, error: "Invalid vehicle class selected." };
    }

    // 8-hour advance booking lead time validation
    if (!options?.skipLeadTimeCheck) {
      const leadCheck = validateTransferLeadTime(flightDate, flightTime);
      if (!leadCheck.valid) {
        return {
          valid: false,
          error:
            leadCheck.error ||
            "Transfer requests are accepted up to a maximum of 8 hours prior to arrival.",
        };
      }

      if (direction === "round_trip") {
        const returnCheck = validateReturnFlightTime(flightDate, flightTime, returnDate!, returnTime!);
        if (!returnCheck.valid) {
          return {
            valid: false,
            error: returnCheck.error || "Invalid return flight date or time.",
          };
        }
      }
    }

    return { valid: true };
  }

  /**
   * Calculate pricing for a given route and vehicle
   */
  calculatePricing(
    zoneId: string,
    vehicleClass: string,
    direction: "airport_to_hotel" | "hotel_to_airport" | "round_trip" | "arrival" | "departure"
  ): TransferPricingResult | null {
    const zone = getZoneById(zoneId);
    if (!zone) return null;

    if (zone.isCustom) {
      return {
        zone,
        basePrice: 0,
        totalAmount: 0,
        isCustom: true,
      };
    }

    const normalizedDir = normalizeTransferDirection(direction);
    const calc =
      normalizedDir === "round_trip"
        ? calculateRoundTripPrice(zone, vehicleClass as VehicleClass)
        : calculateTransferPrice(zone, vehicleClass as VehicleClass);

    if (!calc) return null;

    return {
      zone,
      basePrice: calc.basePrice,
      totalAmount: calc.totalAmount,
      isCustom: false,
    };
  }

  /**
   * Create a new transfer booking, set up payment if requested, and send confirmations.
   */
  async createBooking(input: CreateTransferBookingInput) {
    const validation = this.validateBooking(input);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    // Check if vehicle class is active in site settings
    const settingsRows = await db.select().from(siteSettings);
    const settingsMap: Record<string, any> = {};
    for (const r of settingsRows) {
      settingsMap[r.key] = r.value;
    }
    const isVehicleActive = isVehicleClassActive(input.vehicleClass as VehicleClass, {
      vehicleSedanActive: settingsMap["operations_vehicle_sedan_active"],
      vehicleSuvActive: settingsMap["operations_vehicle_suv_active"],
      vehicleMinivanActive: settingsMap["operations_vehicle_minivan_active"],
      vehicleSprinterActive: settingsMap["operations_vehicle_sprinter_active"],
    });
    if (!isVehicleActive) {
      throw new Error(`The selected vehicle (${input.vehicleClass}) is currently unavailable.`);
    }

    const pricing = this.calculatePricing(input.zoneId, input.vehicleClass, input.direction);
    if (!pricing) {
      throw new Error("Unable to calculate price for this route.");
    }

    const { zone } = pricing;
    const airportInfo = getAirportByCode(input.airport as AirportCode);
    const bookingNumber = generateTransferRef();
    const cleanEmail = String(input.email).trim().toLowerCase();
    const paymentMethod = input.paymentMethod || "online";
    const dbDirection = normalizeTransferDirection(input.direction);

    // Read configurable deposit percent (default 20%)
    const depositPercent = Number(settingsMap["pricing_transfer_deposit_percent"]) || 20;
    const breakdown = calculateTransferPaymentBreakdown(pricing.totalAmount, depositPercent);

    const isOnline = paymentMethod === "online" || paymentMethod === "partial_deposit";
    const finalPaymentMethod = zone.isCustom
      ? "on_arrival"
      : isOnline
      ? (breakdown.isPartial ? "partial_deposit" : "online")
      : "on_arrival";

    const depositAmountVal = isOnline && !zone.isCustom
      ? (breakdown.isPartial ? breakdown.depositAmount : pricing.totalAmount)
      : 0;

    const remainingAmountVal = isOnline && !zone.isCustom
      ? (breakdown.isPartial ? breakdown.remainingAmount : 0)
      : pricing.totalAmount;

    // Initialize Payriff order if online payment and not custom quote
    let payriffResult: any = null;
    if (isOnline && !zone.isCustom) {
      payriffResult = await createPayriffOrder({
        applicationNumber: bookingNumber,
        amount: breakdown.isPartial ? breakdown.depositAmount : pricing.totalAmount,
        currency: "USD",
        description: breakdown.isPartial
          ? `Transfer Deposit (${depositPercent}%) ${input.direction} — ${zone.name} (${input.vehicleClass})`
          : `Airport Transfer ${input.direction} — ${zone.name} (${input.vehicleClass})`,
        email: cleanEmail,
      });
    }

    // Insert database record and audit log atomically
    await db.transaction(async (tx) => {
      await tx.insert(transferBookings).values({
        bookingNumber,
        userId: input.userId || null,
        direction: dbDirection,
        airport: input.airport as AirportCode,
        pickupZone: zone.name,
        dropoffAddress: String(input.dropoffAddress).trim(),
        distanceKm: String(zone.distanceKm),
        vehicleClass: input.vehicleClass as any,
        basePrice: String(pricing.basePrice.toFixed(2)),
        totalAmount: String(pricing.totalAmount.toFixed(2)),
        depositAmount: String(depositAmountVal.toFixed(2)),
        remainingAmount: String(remainingAmountVal.toFixed(2)),
        flightNumber: String(input.flightNumber).trim().toUpperCase(),
        flightDate: input.flightDate,
        flightTime: input.flightTime,
        returnFlightNumber: input.returnFlightNumber
          ? String(input.returnFlightNumber).trim().toUpperCase()
          : null,
        returnDate: input.returnDate || null,
        returnTime: input.returnTime || null,
        passengerName: String(input.passengerName).trim(),
        passengerCount: Number(input.passengerCount),
        phoneNumber: String(input.phoneNumber).trim(),
        email: cleanEmail,
        luggageNotes: input.luggageNotes ? String(input.luggageNotes).trim() : null,
        femaleDriver: Boolean(input.femaleDriver),
        additionalGuide: Boolean(input.additionalGuide),
        paymentMethod: finalPaymentMethod,
        paymentStatus: finalPaymentMethod === "on_arrival" ? "on_arrival" : "pending",
        status: "pending",
        payriffOrderId: payriffResult?.orderId || null,
      });

      await recordAuditLog({
        entityType: "transfer",
        entityId: bookingNumber,
        action: "transfer.booked",
        actorEmail: cleanEmail,
        actorRole: "customer",
        metadata: {
          direction: input.direction,
          airport: input.airport,
          zone: zone.name,
          vehicleClass: input.vehicleClass,
          femaleDriver: Boolean(input.femaleDriver),
          additionalGuide: Boolean(input.additionalGuide),
          flightNumber: input.flightNumber,
          flightDate: input.flightDate,
          totalAmount: pricing.totalAmount,
          depositAmount: depositAmountVal,
          remainingAmount: remainingAmountVal,
          paymentMethod: finalPaymentMethod,
          hasPayriffOrder: !!payriffResult?.orderId,
          clientIp: input.clientIp,
        },
      }, tx);
    });

    logger.info("transfer_booked", {
      bookingNumber,
      direction: input.direction,
      airport: input.airport,
      vehicleClass: input.vehicleClass,
      paymentMethod: finalPaymentMethod,
      totalAmount: pricing.totalAmount,
      depositAmount: depositAmountVal,
      remainingAmount: remainingAmountVal,
    });

    // Asynchronously dispatch customer confirmation email
    sendTransferConfirmationEmail({
      to: cleanEmail,
      passengerName: String(input.passengerName).trim(),
      bookingNumber,
      direction: input.direction,
      airport: airportInfo?.fullName ?? input.airport,
      pickupZone: zone.name,
      flightNumber: String(input.flightNumber).trim().toUpperCase(),
      flightDate: input.flightDate,
      totalAmount: pricing.totalAmount,
      femaleDriver: Boolean(input.femaleDriver),
      additionalGuide: Boolean(input.additionalGuide),
    }).catch((err) => console.warn("[Non-fatal transfer confirmation email error]:", err));

    // Handle on-arrival or custom quote
    if (finalPaymentMethod === "on_arrival") {
      sendTelegramTransferAlert({
        bookingNumber,
        direction: dbDirection,
        airport: airportInfo?.fullName ?? input.airport,
        pickupZone: zone.name,
        dropoffAddress: String(input.dropoffAddress).trim(),
        vehicleClass: input.vehicleClass,
        flightNumber: String(input.flightNumber).trim().toUpperCase(),
        flightDate: input.flightDate,
        flightTime: input.flightTime,
        returnFlightNumber: input.returnFlightNumber || undefined,
        returnDate: input.returnDate || undefined,
        passengerName: String(input.passengerName).trim(),
        passengerCount: Number(input.passengerCount),
        phoneNumber: String(input.phoneNumber).trim(),
        email: cleanEmail,
        totalAmount: pricing.totalAmount,
        depositAmount: 0,
        remainingAmount: pricing.totalAmount,
        paymentMethod: "on_arrival",
        femaleDriver: Boolean(input.femaleDriver),
        additionalGuide: Boolean(input.additionalGuide),
      }).catch(console.error);

      return {
        success: true,
        bookingNumber,
        paymentMethod: "on_arrival",
        totalAmount: pricing.totalAmount,
        depositAmount: 0,
        remainingAmount: pricing.totalAmount,
        isCustomZone: zone.isCustom,
        trackUrl: `/transfer/track?ref=${encodeURIComponent(bookingNumber)}&email=${encodeURIComponent(cleanEmail)}`,
      };
    }

    // Online payment return (deposit or full)
    return {
      success: true,
      bookingNumber,
      paymentMethod: finalPaymentMethod,
      totalAmount: pricing.totalAmount,
      depositAmount: depositAmountVal,
      remainingAmount: remainingAmountVal,
      isCustomZone: false,
      orderId: payriffResult.orderId,
      paymentUrl: payriffResult.paymentUrl,
      isMock: payriffResult.isMock,
      trackUrl: `/transfer/track?ref=${encodeURIComponent(bookingNumber)}&email=${encodeURIComponent(cleanEmail)}`,
    };
  }

  /**
   * Look up transfer booking by reference and email for public tracking.
   */
  async getByReferenceAndEmail(reference: string, email: string) {
    const booking = await db.query.transferBookings.findFirst({
      where: and(
        eq(transferBookings.bookingNumber, reference.toUpperCase()),
        eq(transferBookings.email, email.toLowerCase())
      ),
    });

    if (!booking) return null;

    return {
      bookingNumber: booking.bookingNumber,
      status: booking.status,
      direction: booking.direction,
      airport: booking.airport,
      pickupZone: booking.pickupZone,
      dropoffAddress: booking.dropoffAddress,
      vehicleClass: booking.vehicleClass,
      flightNumber: booking.flightNumber,
      flightDate: booking.flightDate,
      flightTime: booking.flightTime,
      returnFlightNumber: booking.returnFlightNumber,
      returnDate: booking.returnDate,
      returnTime: booking.returnTime,
      passengerName: booking.passengerName,
      passengerCount: booking.passengerCount,
      totalAmount: booking.totalAmount,
      depositAmount: booking.depositAmount,
      remainingAmount: booking.remainingAmount,
      paymentMethod: booking.paymentMethod,
      paymentStatus: booking.paymentStatus,
      driverName: booking.driverName,
      driverPhone: booking.driverPhone,
      createdAt: booking.createdAt,
    };
  }

  /**
   * Admin: List all transfer bookings
   */
  async listBookings() {
    return db.select().from(transferBookings).orderBy(desc(transferBookings.createdAt));
  }
}

export const transferService = new TransferService();
