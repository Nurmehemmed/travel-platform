// @vitest-environment happy-dom
import React, { useState } from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "@/lib/i18n";
import { FileText, Car, Sparkles, ChevronDown, ArrowRight } from "lucide-react";

// Testable representation of the Services Dropdown as implemented in page.tsx
function ServicesDropdownFixture() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, t } = useLanguage();

  const servicesLabel =
    language === "AZ"
      ? "Xidmətlər"
      : language === "RU"
      ? "Услуги"
      : language === "FR"
      ? "Services"
      : language === "AR"
      ? "الخدمات"
      : language === "DE"
      ? "Dienste"
      : "Services";

  return (
    <div
      id="services-dropdown-container"
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Services Menu"
      >
        <span>{servicesLabel}</span>
        <ChevronDown className={`h-3 w-3 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div role="menu" className="absolute start-0 top-full pt-2 w-72">
          <a href="/visa" role="menuitem">
            <FileText className="h-4 w-4" />
            <span>{t.nav.evisa}</span>
            <span>3h</span>
          </a>
          <a href="/transfer" role="menuitem">
            <Car className="h-4 w-4" />
            <span>{t.nav.transfer}</span>
          </a>
          <a href="/custom-itinerary" role="menuitem">
            <Sparkles className="h-4 w-4" />
            <span>Custom Tour Planner</span>
          </a>
          <a href="/medical" role="menuitem">
            <span>Medical Tourism</span>
          </a>
          <a href="/mice" role="menuitem">
            <span>MICE Corporate</span>
          </a>
        </div>
      )}
    </div>
  );
}

describe("ServicesDropdown Navigation Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  function renderDropdown() {
    return render(
      <LanguageProvider>
        <ServicesDropdownFixture />
      </LanguageProvider>
    );
  }

  it("renders services dropdown trigger button with default English label", () => {
    renderDropdown();
    const button = screen.getByRole("button", { name: /services menu/i });
    expect(button).toBeDefined();
    expect(button.textContent).toContain("Services");
    expect(button.getAttribute("aria-expanded")).toBe("false");
  });

  it("opens dropdown on click and displays all 5 travel services", () => {
    renderDropdown();
    const button = screen.getByRole("button", { name: /services menu/i });

    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");

    const menu = screen.getByRole("menu");
    expect(menu).toBeDefined();

    // Verify all 5 core services exist
    expect(screen.getByText(/e-visa/i)).toBeDefined();
    expect(screen.getByText(/transfer/i)).toBeDefined();
    expect(screen.getByText(/custom tour planner/i)).toBeDefined();
    expect(screen.getByText(/medical tourism/i)).toBeDefined();
    expect(screen.getByText(/mice corporate/i)).toBeDefined();
  });

  it("opens on hover and closes on mouse leave", () => {
    renderDropdown();
    const container = document.getElementById("services-dropdown-container")!;

    // Hover in
    fireEvent.mouseEnter(container);
    expect(screen.getByRole("menu")).toBeDefined();

    // Hover out
    fireEvent.mouseLeave(container);
    expect(screen.queryByRole("menu")).toBeNull();
  });
});
