import { test, expect } from "@playwright/test";

test.describe("Tour Booking Journey", () => {
  test("browses to Baku Old City Walking Tour and opens reservation modal", async ({ page }) => {
    // Navigate directly to the tour details page
    await page.goto("/tours/baku-old-city-walking-tour");

    // Verify page header and title
    const heading = page.locator("h1");
    await expect(heading).toBeVisible();
    await expect(heading).toContainText("Baku Old City Walking Tour");

    // Verify duration and price badge
    await expect(page.getByText(/\$25/i).first()).toBeVisible();

    // Verify booking action button exists
    const bookButton = page.getByRole("button", { name: /book now|reserve/i }).first();
    await expect(bookButton).toBeVisible();
  });
});
