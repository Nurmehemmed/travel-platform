/**
 * Telegram Notification Dispatcher for Operations Team
 *
 * Sends instant alerts when a traveler submits an e-Visa application.
 * Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env
 */

export interface VisaTelegramAlertPayload {
  applicationNumber: string;
  visaType: "standard" | "urgent";
  applicantName: string;
  nationality: string;
  passportNumber: string;
  arrivalDate: string;
  totalAmount: number | string;
  email: string;
  phoneNumber: string;
}

export async function sendTelegramVisaAlert(payload: VisaTelegramAlertPayload): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log(
      `[Telegram Alert] (Bot token/Chat ID not configured in .env): New ${payload.visaType.toUpperCase()} visa for ${payload.applicantName} (${payload.applicationNumber})`
    );
    return false;
  }

  const isUrgent = payload.visaType === "urgent";
  const header = isUrgent
    ? "🚨⚡ <b>[URGENT 3-HOUR] NEW AZERBAIJAN E-VISA</b>"
    : "📋 <b>[STANDARD 3-DAY] NEW AZERBAIJAN E-VISA</b>";

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const text = `
${header}

🆔 <b>Reference:</b> <code>${payload.applicationNumber}</code>
👤 <b>Applicant:</b> ${escapeHtml(payload.applicantName)}
🌍 <b>Nationality:</b> ${escapeHtml(payload.nationality)}
🛂 <b>Passport No:</b> <code>${escapeHtml(payload.passportNumber)}</code>
📅 <b>Arrival Date:</b> ${payload.arrivalDate}
💰 <b>Total Paid:</b> $${Number(payload.totalAmount).toFixed(2)}
📧 <b>Email:</b> ${escapeHtml(payload.email)}
📱 <b>Phone:</b> ${escapeHtml(payload.phoneNumber)}

👉 <a href="${appUrl}/admin">Open Admin Portal to Process</a>
`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("[Telegram Alert error]:", errData);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Telegram Alert dispatch failed]:", error);
    return false;
  }
}

/**
 * Send generic critical system or security alerts to Telegram
 */
export async function sendTelegramAlert(message: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("[sendTelegramAlert error]:", err);
    return false;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function notifyTelegram(message: string): Promise<boolean> {
  return sendTelegramAlert(message);
}

// ─── Transfer Alert ──────────────────────────────────────────────────────────

export interface TransferTelegramAlertPayload {
  bookingNumber: string;
  direction: "arrival" | "departure" | "round_trip";
  airport: string;
  pickupZone: string;
  dropoffAddress: string;
  vehicleClass: string;
  flightNumber: string;
  flightDate: string;
  flightTime: string;
  returnFlightNumber?: string | null | undefined;
  returnDate?: string | null | undefined;
  passengerName: string;
  passengerCount: number;
  phoneNumber: string;
  email: string;
  totalAmount: number | string;
  paymentMethod: "online" | "on_arrival";
}

/**
 * Sends a transfer booking alert to the dedicated transfer ops Telegram channel.
 * Uses TELEGRAM_TRANSFER_CHAT_ID; falls back to TELEGRAM_CHAT_ID if not set.
 */
export async function sendTelegramTransferAlert(
  payload: TransferTelegramAlertPayload
): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_TRANSFER_CHAT_ID || process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log(
      `[Telegram Transfer Alert] (not configured): New transfer ${payload.bookingNumber} for ${payload.passengerName}`
    );
    return false;
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const directionLabel =
    payload.direction === "arrival" ? "🛬 Arrival (Airport \u2192 Hotel)" :
    payload.direction === "departure" ? "🛫 Departure (Hotel \u2192 Airport)" :
    "🔄 Round Trip (Both ways)";

  const vehicleLabel =
    payload.vehicleClass === "sedan" ? "🚗 Sedan" :
    payload.vehicleClass === "suv" ? "🚙 SUV" :
    payload.vehicleClass === "minivan" ? "🚐 Minivan" :
    payload.vehicleClass === "business" ? "🚙 Business Sedan" :
    payload.vehicleClass === "executive" ? "🚌 Executive Minibus" :
    "🚗 Sedan";

  const paymentLabel = payload.paymentMethod === "online" ? "✅ Paid Online" : "💵 Pay on Arrival";

  const returnSection =
    payload.direction === "round_trip" && payload.returnFlightNumber
      ? `\n↩️ <b>Return Flight:</b> ${payload.returnFlightNumber} on ${payload.returnDate}`
      : "";

  const text = `
🚖 <b>NEW AIRPORT TRANSFER BOOKING</b>

🆔 <b>Booking Ref:</b> <code>${payload.bookingNumber}</code>
${directionLabel}
🛩️ <b>Airport:</b> ${payload.airport}
✈️ <b>Flight:</b> ${payload.flightNumber} — ${payload.flightDate} at ${payload.flightTime}${returnSection}
📍 <b>Zone:</b> ${payload.pickupZone}
🏨 <b>Address:</b> ${payload.dropoffAddress}

${vehicleLabel}
👥 <b>Passengers:</b> ${payload.passengerCount}
👤 <b>Name:</b> ${payload.passengerName}
📱 <b>Phone:</b> ${payload.phoneNumber}
📧 <b>Email:</b> ${payload.email}

💰 <b>Total:</b> $${Number(payload.totalAmount).toFixed(2)} — ${paymentLabel}

👉 <a href="${appUrl}/admin">Open Admin Portal → Transfers</a>
`;

  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error("[Telegram Transfer Alert error]:", errData);
      return false;
    }
    return true;
  } catch (error) {
    console.error("[Telegram Transfer Alert dispatch failed]:", error);
    return false;
  }
}
