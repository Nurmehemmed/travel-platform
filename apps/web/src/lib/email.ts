/**
 * Transactional Email Dispatcher for Travelers
 *
 * Sends branded, high-deliverability booking confirmations, vouchers, and status updates.
 * Supports Resend API (RESEND_API_KEY) with safe fallback to operations log.
 */

import { CURRENT_BRAND } from "./brand";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendTransactionalEmail(options: EmailOptions): Promise<boolean> {
  const { to, subject, html } = options;
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || `${CURRENT_BRAND.name} Support <noreply@${CURRENT_BRAND.domain}>`;

  if (!apiKey) {
    console.log(`[Email Dispatcher] (RESEND_API_KEY not configured): Would email "${subject}" to ${to}`);
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        from: fromEmail,
        to: [to],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("[Email Dispatcher error]:", err);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[Email Dispatcher failed]:", error);
    return false;
  }
}

/**
 * Generates and sends a stylized Visa Application confirmation email
 */
export async function sendVisaConfirmationEmail(params: {
  to: string;
  applicantName: string;
  referenceNumber: string;
  visaType: "standard" | "urgent";
  arrivalDate: string;
  totalAmount: number;
}): Promise<boolean> {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || `https://${CURRENT_BRAND.domain}`).replace(/\/$/, "");
  const trackUrl = `${appUrl}/visa/track?ref=${params.referenceNumber}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b1329; color: #ffffff; padding: 40px 20px;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #111d3d; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="color: #fbbf24; margin: 0; font-size: 24px; font-weight: 700;">${CURRENT_BRAND.name} Azerbaijan</h1>
      <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">Official ASAN e-Visa Agency & Inbound DMC</p>
    </div>

    <div style="background-color: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <h2 style="color: #34d399; font-size: 16px; margin: 0 0 8px 0;">✓ Application Received & Under Processing</h2>
      <p style="color: #cbd5e1; font-size: 13px; margin: 0;">Dear ${params.applicantName}, your Azerbaijan e-Visa application has been submitted to the State Migration Service.</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; color: #e2e8f0;">
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
        <td style="padding: 10px 0; color: #94a3b8;">Application Reference:</td>
        <td style="padding: 10px 0; text-align: right; font-weight: 600; font-family: monospace; color: #fbbf24;">${params.referenceNumber}</td>
      </tr>
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
        <td style="padding: 10px 0; color: #94a3b8;">Processing Speed:</td>
        <td style="padding: 10px 0; text-align: right;">${params.visaType === "urgent" ? "Urgent (3 Hours)" : "Standard (3 Working Days)"}</td>
      </tr>
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
        <td style="padding: 10px 0; color: #94a3b8;">Arrival Date:</td>
        <td style="padding: 10px 0; text-align: right;">${params.arrivalDate}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #94a3b8;">Total Amount:</td>
        <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #34d399;">$${params.totalAmount.toFixed(2)} USD</td>
      </tr>
    </table>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${trackUrl}" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: #0b1329; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; display: inline-block;">Track Application Status →</a>
    </div>

    <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
      ${CURRENT_BRAND.legalName} • Nizami St, Baku • 24/7 Support: ${CURRENT_BRAND.supportEmail}
    </p>
  </div>
</body>
</html>
  `;

  return sendTransactionalEmail({
    to: params.to,
    subject: `Azerbaijan e-Visa Application Confirmation (${params.referenceNumber})`,
    html,
  });
}

/**
 * Generates and sends an Airport Transfer confirmation email
 */
export async function sendTransferConfirmationEmail(params: {
  to: string;
  passengerName: string;
  bookingNumber: string;
  direction: string;
  airport: string;
  pickupZone: string;
  flightNumber: string;
  flightDate: string;
  totalAmount: number;
  femaleDriver?: boolean;
  additionalGuide?: boolean;
}): Promise<boolean> {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || `https://${CURRENT_BRAND.domain}`).replace(/\/$/, "");
  const trackUrl = `${appUrl}/transfer/track?ref=${params.bookingNumber}&email=${encodeURIComponent(params.to)}`;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b1329; color: #ffffff; padding: 40px 20px;">
  <div style="max-width: 580px; margin: 0 auto; background-color: #111d3d; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); padding: 32px;">
    <div style="text-align: center; margin-bottom: 24px;">
      <h1 style="color: #fbbf24; margin: 0; font-size: 24px; font-weight: 700;">${CURRENT_BRAND.name} Transfers</h1>
      <p style="color: #94a3b8; font-size: 14px; margin-top: 4px;">VIP Baku Airport Transfer Voucher</p>
    </div>

    <div style="background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <h2 style="color: #60a5fa; font-size: 16px; margin: 0 0 8px 0;">🚖 Transfer Confirmed</h2>
      <p style="color: #cbd5e1; font-size: 13px; margin: 0;">Dear ${params.passengerName}, your airport transfer booking has been registered. Our private driver will meet you with a nameboard at the terminal.</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; color: #e2e8f0;">
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
        <td style="padding: 10px 0; color: #94a3b8;">Booking Reference:</td>
        <td style="padding: 10px 0; text-align: right; font-weight: 600; font-family: monospace; color: #fbbf24;">${params.bookingNumber}</td>
      </tr>
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
        <td style="padding: 10px 0; color: #94a3b8;">Airport / Destination:</td>
        <td style="padding: 10px 0; text-align: right;">${params.airport} ➔ ${params.pickupZone}</td>
      </tr>
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
        <td style="padding: 10px 0; color: #94a3b8;">Flight & Date:</td>
        <td style="padding: 10px 0; text-align: right;">${params.flightNumber} (${params.flightDate})</td>
      </tr>
      ${params.femaleDriver ? `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
        <td style="padding: 10px 0; color: #f472b6;">Driver Preference:</td>
        <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #f472b6;">👩‍🦰 Female Chauffeur (Priority Request)</td>
      </tr>` : ""}
      ${params.additionalGuide ? `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
        <td style="padding: 10px 0; color: #38bdf8;">Service Add-on:</td>
        <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #38bdf8;">🧭 Driver + Licensed Tour Guide</td>
      </tr>` : ""}
      <tr>
        <td style="padding: 10px 0; color: #94a3b8;">Total Price:</td>
        <td style="padding: 10px 0; text-align: right; font-weight: 600; color: #34d399;">$${params.totalAmount.toFixed(2)} USD</td>
      </tr>
    </table>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${trackUrl}" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: #0b1329; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 14px; display: inline-block;">View Transfer Voucher & Live Driver Status →</a>
    </div>
  </div>
</body>
</html>
  `;

  return sendTransactionalEmail({
    to: params.to,
    subject: `Airport Transfer Booking Confirmed (${params.bookingNumber})`,
    html,
  });
}
