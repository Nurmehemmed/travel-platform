/**
 * Anti-Bot & Fraud Protection Utility
 *
 * Implements a multi-tiered defense against malicious scraping and automated submission bots:
 * 1. Honeypot Validation: Catches naive automated bots filling hidden inputs.
 * 2. Submission Timing Validator: Flags superhuman instantaneous form submissions (< 1.5s).
 * 3. Cloudflare Turnstile Verify: Secure CAPTCHA-less token verification when TURNSTILE_SECRET_KEY is configured.
 */

export interface BotValidationOptions {
  honeypotValue?: string | null | undefined;
  formStartedAt?: number | string | null | undefined; // epoch ms
  turnstileToken?: string | null | undefined;
  clientIp?: string | null | undefined;
}

export interface BotValidationResult {
  isBot: boolean;
  reason?: string;
}

export async function validateBotProtection(
  options: BotValidationOptions
): Promise<BotValidationResult> {
  const { honeypotValue, formStartedAt, turnstileToken, clientIp } = options;

  // 1. Check Honeypot: A hidden field that should always remain empty for real humans
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return {
      isBot: true,
      reason: "Honeypot trap triggered",
    };
  }

  // 2. Check Submission Timing: If the form was submitted in < 1500ms, it is an automated script
  if (formStartedAt) {
    const started = Number(formStartedAt);
    if (!isNaN(started) && started > 0) {
      const elapsed = Date.now() - started;
      if (elapsed < 1200) {
        return {
          isBot: true,
          reason: "Superhuman form submission speed (< 1.2s)",
        };
      }
    }
  }

  // 3. Cloudflare Turnstile Verification (if secret key configured)
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  if (turnstileSecret && turnstileToken) {
    try {
      const formData = new URLSearchParams();
      formData.append("secret", turnstileSecret);
      formData.append("response", turnstileToken);
      if (clientIp) formData.append("remoteip", clientIp);

      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
          signal: AbortSignal.timeout(4000),
        }
      );

      if (verifyRes.ok) {
        const data = await verifyRes.json();
        if (!data.success) {
          return {
            isBot: true,
            reason: `Turnstile challenge failed: ${(data["error-codes"] || []).join(", ")}`,
          };
        }
      }
    } catch (err) {
      // In case of timeout or network glitch to Cloudflare, fail open gracefully to avoid blocking legitimate travelers
      console.warn("[Turnstile verification glitch, failing open]:", err);
    }
  }

  return { isBot: false };
}
