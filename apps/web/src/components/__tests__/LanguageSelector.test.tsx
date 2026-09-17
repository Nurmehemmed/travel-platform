// @vitest-environment happy-dom
import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider } from "@/lib/i18n";
import { LanguageSelector } from "../LanguageSelector";

describe("LanguageSelector UI Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function renderWithProvider() {
    return render(
      <LanguageProvider>
        <LanguageSelector />
      </LanguageProvider>
    );
  }

  it("renders language trigger button with initial English flag and label", () => {
    renderWithProvider();
    const button = screen.getByRole("button", { name: /select language/i });
    expect(button).toBeDefined();
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(button.textContent).toContain("🇬🇧");
    expect(button.textContent).toContain("EN");
  });

  it("opens language selection dropdown on button click", () => {
    renderWithProvider();
    const trigger = screen.getByRole("button", { name: /select language/i });

    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    // All supported languages should be rendered
    expect(screen.getByText("English")).toBeDefined();
    expect(screen.getByText("Azərbaycan")).toBeDefined();
    expect(screen.getByText("Русский")).toBeDefined();
    expect(screen.getByText("العربية")).toBeDefined();
    expect(screen.getByText("Français")).toBeDefined();
    expect(screen.getByText("Deutsch")).toBeDefined();
  });

  it("switches active language and updates trigger flag when selecting Azerbaijani", () => {
    renderWithProvider();
    const trigger = screen.getByRole("button", { name: /select language/i });

    fireEvent.click(trigger);
    const azOption = screen.getByText("Azərbaycan");
    fireEvent.click(azOption);

    // Dropdown should close and trigger should show AZ flag
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    expect(trigger.textContent).toContain("🇦🇿");
    expect(trigger.textContent).toContain("AZ");
  });

  it("closes dropdown when user clicks outside the component", () => {
    renderWithProvider();
    const trigger = screen.getByRole("button", { name: /select language/i });

    fireEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");

    fireEvent.mouseDown(document.body);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });
});
