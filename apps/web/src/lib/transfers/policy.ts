/**
 * @file policy.ts
 * @description Transfer booking lead time and operational policies.
 * Transfer requests are accepted up to a maximum of 8 hours prior to arrival.
 */

export const MIN_TRANSFER_LEAD_TIME_HOURS = 8;
export const AZERBAIJAN_TIMEZONE_OFFSET_HOURS = 4; // UTC+4 (AZT - Azerbaijan Time year-round)

/**
 * Converts a flight date ("YYYY-MM-DD") and flight time ("HH:mm" or "HH:mm:ss")
 * into a UTC timestamp in milliseconds, assuming the flight is in Azerbaijan local time (AZT / UTC+4).
 */
export function parseFlightDateTimeToTimestamp(dateStr: string, timeStr: string): number | null {
  if (!dateStr || !timeStr) return null;
  const cleanDate = dateStr.trim();
  const cleanTime = timeStr.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(cleanDate)) return null;
  if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(cleanTime)) return null;

  const [hoursStr, minutesStr] = cleanTime.split(":");
  const hours = parseInt(hoursStr!, 10);
  const minutes = parseInt(minutesStr!, 10);
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    return null;
  }

  const pad = (n: number) => String(n).padStart(2, "0");
  const isoStr = `${cleanDate}T${pad(hours)}:${pad(minutes)}:00+04:00`;
  const ts = Date.parse(isoStr);
  return isNaN(ts) ? null : ts;
}

/**
 * Calculates hours remaining between now and the flight datetime.
 * Returns positive hours if in future, negative if in past, or null if invalid.
 */
export function getLeadTimeHours(
  dateStr: string,
  timeStr: string,
  nowMs: number = Date.now()
): number | null {
  const flightTs = parseFlightDateTimeToTimestamp(dateStr, timeStr);
  if (flightTs === null) return null;
  return (flightTs - nowMs) / (1000 * 60 * 60);
}

export interface TransferLeadTimeValidationResult {
  valid: boolean;
  error?: string;
  hoursRemaining?: number;
}

/**
 * Validates that the requested flight arrival or departure meets the minimum lead time policy (8 hours).
 */
export function validateTransferLeadTime(
  flightDate: string,
  flightTime: string,
  minHours: number = MIN_TRANSFER_LEAD_TIME_HOURS,
  nowMs: number = Date.now()
): TransferLeadTimeValidationResult {
  if (!flightDate || !flightDate.trim()) {
    return { valid: false, error: "Flight date is required." };
  }
  if (!flightTime || !flightTime.trim()) {
    return { valid: false, error: "Flight time is required." };
  }

  const hoursRemaining = getLeadTimeHours(flightDate, flightTime, nowMs);
  if (hoursRemaining === null) {
    return { valid: false, error: "Invalid flight date or time format." };
  }

  if (hoursRemaining < 0) {
    return {
      valid: false,
      error: "Flight date and time cannot be in the past.",
      hoursRemaining,
    };
  }

  if (hoursRemaining < minHours) {
    const wholeHours = Math.max(0, Math.floor(hoursRemaining));
    const mins = Math.round((hoursRemaining % 1) * 60);
    return {
      valid: false,
      error: `Transfer requests are accepted up to a maximum of 8 hours prior to arrival (selected time is only ${wholeHours}h ${mins}m away).`,
      hoursRemaining,
    };
  }

  return { valid: true, hoursRemaining };
}

/**
 * Validates return flight for round-trip bookings.
 * Return flight must also satisfy the 8-hour rule AND be strictly after the primary flight.
 */
export function validateReturnFlightTime(
  primaryDate: string,
  primaryTime: string,
  returnDate: string,
  returnTime: string,
  minHours: number = MIN_TRANSFER_LEAD_TIME_HOURS,
  nowMs: number = Date.now()
): { valid: boolean; error?: string } {
  if (!returnDate || !returnDate.trim()) {
    return { valid: false, error: "Return flight date is required." };
  }
  if (!returnTime || !returnTime.trim()) {
    return { valid: false, error: "Return flight time is required." };
  }

  const returnValidation = validateTransferLeadTime(returnDate, returnTime, minHours, nowMs);
  if (!returnValidation.valid) {
    return {
      valid: false,
      error: `Return flight: ${returnValidation.error}`,
    };
  }

  const primaryTs = parseFlightDateTimeToTimestamp(primaryDate, primaryTime);
  const returnTs = parseFlightDateTimeToTimestamp(returnDate, returnTime);

  if (primaryTs !== null && returnTs !== null && returnTs <= primaryTs) {
    return {
      valid: false,
      error: "Return flight date and time must be after the arrival flight.",
    };
  }

  return { valid: true };
}

/**
 * Returns the earliest valid date string ("YYYY-MM-DD") in Azerbaijan local time
 * that could potentially have a time slot at least `minHours` from `nowMs`.
 */
export function getMinTransferBookingDate(
  minHours: number = MIN_TRANSFER_LEAD_TIME_HOURS,
  nowMs: number = Date.now()
): string {
  // Add minimum lead time
  const minAllowedTs = nowMs + minHours * 60 * 60 * 1000;
  // Convert to Azerbaijan local time (UTC+4)
  const azTime = new Date(minAllowedTs + AZERBAIJAN_TIMEZONE_OFFSET_HOURS * 60 * 60 * 1000);
  const year = azTime.getUTCFullYear();
  const month = String(azTime.getUTCMonth() + 1).padStart(2, "0");
  const day = String(azTime.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export interface TransferPaymentBreakdown {
  totalAmount: number;
  depositPercent: number;
  depositAmount: number;
  remainingAmount: number;
  isPartial: boolean;
}

/**
 * Calculates down payment deposit amount and remaining balance upon delivery.
 * Configurable percentage (e.g. 20%).
 */
export function calculateTransferPaymentBreakdown(
  totalAmount: number,
  depositPercent: number = 20
): TransferPaymentBreakdown {
  const safeTotal = Math.max(0, totalAmount);
  const clampedPercent = Math.min(100, Math.max(0, depositPercent));

  if (clampedPercent <= 0) {
    return {
      totalAmount: safeTotal,
      depositPercent: 0,
      depositAmount: 0,
      remainingAmount: safeTotal,
      isPartial: false,
    };
  }

  if (clampedPercent >= 100) {
    return {
      totalAmount: safeTotal,
      depositPercent: 100,
      depositAmount: safeTotal,
      remainingAmount: 0,
      isPartial: false,
    };
  }

  const rawDeposit = safeTotal * (clampedPercent / 100);
  const depositAmount = Math.max(1, Math.round(rawDeposit * 100) / 100);
  const remainingAmount = Math.max(0, Math.round((safeTotal - depositAmount) * 100) / 100);

  return {
    totalAmount: safeTotal,
    depositPercent: clampedPercent,
    depositAmount,
    remainingAmount,
    isPartial: true,
  };
}

export type PaymentBreakdown = TransferPaymentBreakdown;
export const calculatePaymentBreakdown = calculateTransferPaymentBreakdown;

