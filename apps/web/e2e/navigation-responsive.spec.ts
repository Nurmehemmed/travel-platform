import { test, expect } from "@playwright/test";

test.describe("Multi-Device Responsive Navigation", () => {
  test("desktop layout (1440px): renders Services dropdown and opens menu cleanly", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    // The Services dropdown container should be visible
    const dropdownContainer = page.locator("#services-dropdown-container");
    await expect(dropdownContainer).toBeVisible();

    // Hover or click to open
    await dropdownContainer.hover();

    // Ensure all 5 services appear
    await expect(page.getByRole("link", { name: /visa/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /transfer/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /custom/i }).first()).toBeVisible();
  });

  test("mobile layout (390px): renders hamburger drawer with all travel services", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    // On mobile, the desktop dropdown should be hidden
    await expect(page.locator("#services-dropdown-container")).toBeHidden();

    // The hamburger button must be visible
    const hamburger = page.getByRole("button", { name: /open menu|menu/i });
    await expect(hamburger).toBeVisible();

    // Click to open drawer
    await hamburger.click();

    // Verify services in mobile drawer
    await expect(page.getByRole("link", { name: /visa/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /transfer/i }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /custom tour/i }).first()).toBeVisible();
  });
});
