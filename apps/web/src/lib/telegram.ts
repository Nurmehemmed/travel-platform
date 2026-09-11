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
