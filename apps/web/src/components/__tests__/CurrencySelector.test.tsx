// @vitest-environment happy-dom
import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CurrencyProvider } from "@/lib/currency-context";
import { CurrencySelector } from "../CurrencySelector";

describe("CurrencySelector UI Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function renderWithProvider() {
    return render(
      <CurrencyProvider>
        <CurrencySelector />
      </CurrencyProvider>
    );
  }

  it("renders currency trigger button with default USD symbol", () => {
    renderWithProvider();
    const button = screen.getByRole("button", { name: /switch currency/i });
    expect(button).toBeDefined();
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(button.textContent).toContain("$");
    expect(button.textContent).toContain("USD");
  });

  it("toggles currency dropdown list on button click", () => {
    renderWithProvider();
    const trigger = screen.getByRole("button", { name: /switch currency/i });

    // Open dropdown
    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    // Check that currency options are rendered
    expect(screen.getByText("Azerbaijani Manat")).toBeDefined();
    expect(screen.getByText("Euro")).toBeDefined();
    expect(screen.getByText("UAE Dirham")).toBeDefined();
    expect(screen.getByText("British Pound")).toBeDefined();
  });

  it("switches active currency and updates UI when selecting AZN", () => {
    renderWithProvider();
    const trigger = screen.getByRole("button", { name: /switch currency/i });

    fireEvent.click(trigger);
    const aznOption = screen.getByText("Azerbaijani Manat");
    fireEvent.click(aznOption);

    // Dropdown should close and trigger should update to AZN
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.textContent).toContain("₼");
    expect(trigger.textContent).toContain("AZN");
  });

  it("closes dropdown when clicking outside", () => {
    renderWithProvider();
    const trigger = screen.getByRole("button", { name: /switch currency/i });

    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    // Click outside on document body
    fireEvent.mouseDown(document.body);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });
});
