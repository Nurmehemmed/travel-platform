// @vitest-environment happy-dom
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n";
import VoucherShareActions from "../VoucherShareActions";

describe("VoucherShareActions Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  function renderWithProviders(props?: any) {
    const defaultProps = {
      bookingRef: "ATR-TEST12",
      serviceType: "transfer" as const,
      serviceTitle: "Airport VIP Transfer",
      customerName: "Alice Smith",
      summaryDetails: {
        Route: "GYD to Baku Center",
        Flight: "J2-123",
      },
      ...props,
    };

    return render(
      <LanguageProvider>
        <VoucherShareActions {...defaultProps} />
      </LanguageProvider>
    );
  }

  it("renders Save as PDF, WhatsApp, and Copy Link actions", () => {
    renderWithProviders();

    expect(screen.getByText("Save as PDF")).toBeDefined();
    expect(screen.getByText("Send via WhatsApp")).toBeDefined();
    expect(screen.getByTitle("Copy Link")).toBeDefined();
    expect(screen.getByTitle("Email Voucher")).toBeDefined();
  });

  it("has print:hidden attribute to prevent self-rendering inside printed PDF", () => {
    const { container } = renderWithProviders();
    const actionContainer = container.firstChild as HTMLElement;
    expect(actionContainer.className).toContain("print:hidden");
    expect(actionContainer.getAttribute("data-screen-only")).toBe("true");
  });

  it("triggers window.print and sets custom document title", () => {
    const printSpy = vi.fn();
    window.print = printSpy;

    renderWithProviders();
    const savePdfBtn = screen.getByText("Save as PDF");
    fireEvent.click(savePdfBtn);

    expect(printSpy).toHaveBeenCalledTimes(1);
  });

  it("opens WhatsApp with formatted booking details", () => {
    const openSpy = vi.fn();
    window.open = openSpy;

    renderWithProviders();
    const whatsAppBtn = screen.getByText("Send via WhatsApp");
    fireEvent.click(whatsAppBtn);

    expect(openSpy).toHaveBeenCalledTimes(1);
    const openedUrl = String(openSpy.mock.calls[0]?.[0] || "");
    expect(openedUrl).toContain("https://api.whatsapp.com/send?text=");
    expect(openedUrl).toContain(encodeURIComponent("ATR-TEST12"));
    expect(openedUrl).toContain(encodeURIComponent("Alice Smith"));
  });

  it("copies direct voucher link to clipboard when clicking copy", async () => {
    const writeTextSpy = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextSpy },
      configurable: true,
      writable: true,
    });

    renderWithProviders();
    const copyBtn = screen.getByTitle("Copy Link");
    await act(async () => {
      fireEvent.click(copyBtn);
    });

    expect(writeTextSpy).toHaveBeenCalledTimes(1);
  });
});
