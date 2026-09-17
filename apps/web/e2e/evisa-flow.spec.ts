import { test, expect } from "@playwright/test";

test.describe("ASAN e-Visa Application & Verification Journey", () => {
  test("displays official ASAN tiers, pricing and fast track guarantees", async ({ page }) => {
    await page.goto("/visa");

    // Check main title
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toContainText(/e-visa/i);

    // Verify Standard ($59) and Urgent ($110) tiers are displayed
    await expect(page.getByText(/\$59/i).first()).toBeVisible();
    await expect(page.getByText(/\$110/i).first()).toBeVisible();

    // Verify 3-hour fast-track badge
    await expect(page.getByText(/3 hours|3h/i).first()).toBeVisible();

    // Verify Call-to-action button to apply
    const applyButton = page.getByRole("link", { name: /apply now|get your visa/i }).first();
    await expect(applyButton).toBeVisible();
  });
});
