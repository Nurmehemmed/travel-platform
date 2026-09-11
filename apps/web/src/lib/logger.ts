/**
 * @file logger.ts
 * @description Production-ready, PII-safe structured application logger.
 * Formats single-line JSON in production for Vercel Log Drains / Datadog / Axiom,
 * and pretty-prints in development. Automatically redacts sensitive customer data.
 */

import { sendTelegramAlert } from "./telegram";

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";

const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "secret",
  "authorization",
  "cookie",
  "passportnumber",
  "passport_number",
  "cardnumber",
  "card_number",
  "cvv",
  "cvc",
  "apikey",
  "api_key",
  "sessiontoken",
  "session_token",
]);

/** Recursively redacts PII and sensitive credentials from log metadata */
function redactPII(val: any): any {
  if (val === null || val === undefined) return val;
  if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
    return val;
  }
  if (Array.isArray(val)) {
    return val.map(redactPII);
  }
  if (typeof val === "object") {
    const sanitized: Record<string, any> = {};
    for (const [key, value] of Object.entries(val)) {
      const normalizedKey = key.toLowerCase().replace(/[-_]/g, "");
      if (SENSITIVE_KEYS.has(normalizedKey)) {
        sanitized[key] = "[REDACTED]";
      } else if (normalizedKey.includes("password") || normalizedKey.includes("secret")) {
        sanitized[key] = "[REDACTED]";
      } else {
        sanitized[key] = redactPII(value);
      }
    }
    return sanitized;
  }
  return String(val);
}

class Logger {
  private baseContext: Record<string, any>;

  constructor(baseContext: Record<string, any> = {}) {
    this.baseContext = baseContext;
  }

  /** Create a child logger with persistent context (e.g. route, requestId) */
  withContext(context: Record<string, any>): Logger {
    return new Logger({ ...this.baseContext, ...context });
  }

  private emit(level: LogLevel, message: string, meta?: Record<string, any>, error?: unknown) {
    const isProd = process.env.NODE_ENV === "production";
    const timestamp = new Date().toISOString();

    const mergedMeta = redactPII({
      ...this.baseContext,
      ...(meta || {}),
    });

    let errorDetails: Record<string, any> | undefined;
    if (error instanceof Error) {
      errorDetails = {
        name: error.name,
        message: error.message,
        stack: isProd ? error.stack?.split("\n").slice(0, 5).join("\n") : error.stack,
        ...(error as any),
      };
    } else if (error !== undefined) {
      errorDetails = { raw: String(error) };
    }

    const payload = {
      timestamp,
      level,
      message,
      service: "travel-platform",
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || "development",
      ...(Object.keys(mergedMeta).length > 0 ? { meta: mergedMeta } : {}),
      ...(errorDetails ? { error: errorDetails } : {}),
    };

    if (isProd) {
      // In production, emit single-line structured JSON
      const json = JSON.stringify(payload);
      if (level === "error" || level === "fatal") {
        console.error(json);
      } else if (level === "warn") {
        console.warn(json);
      } else {
        console.log(json);
      }
    } else {
      // In development, pretty print
      const prefix = `[${timestamp.slice(11, 19)}] [${level.toUpperCase()}]`;
      const metaStr = payload.meta ? ` ${JSON.stringify(payload.meta)}` : "";
      if (level === "error" || level === "fatal") {
        console.error(`${prefix} ${message}${metaStr}`, error || "");
      } else if (level === "warn") {
        console.warn(`${prefix} ${message}${metaStr}`);
      } else {
        console.log(`${prefix} ${message}${metaStr}`);
      }
    }

    // Critical error dispatch: send alert to Telegram for fatal issues
    if (level === "fatal" || (level === "error" && mergedMeta.alertTelegram)) {
      try {
        sendTelegramAlert(
          `🚨 <b>CRITICAL SYSTEM ERROR</b>\n<b>Message:</b> ${message}\n<b>Level:</b> ${level}\n<b>Context:</b> ${JSON.stringify(mergedMeta)}`
        ).catch(() => {});
      } catch {}
    }
  }

  debug(message: string, meta?: Record<string, any>) {
    if (process.env.NODE_ENV === "development") {
      this.emit("debug", message, meta);
    }
  }

  info(message: string, meta?: Record<string, any>) {
    this.emit("info", message, meta);
  }

  warn(message: string, meta?: Record<string, any>) {
    this.emit("warn", message, meta);
  }

  error(message: string, error?: unknown, meta?: Record<string, any>) {
    this.emit("error", message, meta, error);
  }

  fatal(message: string, error?: unknown, meta?: Record<string, any>) {
    this.emit("fatal", message, meta, error);
  }
}

export const logger = new Logger();
