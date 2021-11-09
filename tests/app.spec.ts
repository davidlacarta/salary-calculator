import { test, expect } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("/");
  const monthlyNetSalary = page.locator("#monthly-net-salary");
  await expect(monthlyNetSalary).toHaveText("1930 €");
});
