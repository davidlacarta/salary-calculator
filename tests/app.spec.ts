import { test, expect } from "@playwright/test";
import formatNumber from "../src/lib/formatNumber";
import { Props } from "../src/lib/grossToNetSalary";
import { cases } from "./cases.json";
import SalaryPage from "./page";

for (const { input, expected } of cases) {
  test(parseTitle(input), async ({ page }) => {
    const salaryPage = new SalaryPage(page);

    await salaryPage.home();
    await salaryPage.fillAnnualGrossSalary(input.annualGrossSalary);
    await salaryPage.clickAnnualPaymentsNumber(input.annualPaymentsNumber);
    await salaryPage.clickChildrenNumber(input.childrenNumber);
    if (input?.childrenNumber) {
      await salaryPage.clickBabiesNumber(input.babiesNumber);
    }

    await expect(salaryPage.getMonthlyNetSalary()).toHaveText(
      formatNumber(expected.monthlyNetSalary)
    );
    await expect(salaryPage.getAnnualNetSalary()).toHaveText(
      formatNumber(expected.annualNetSalary)
    );
    await expect(salaryPage.getMonthlyFee()).toHaveText(
      formatNumber(expected.annualFee / 12)
    );
    await expect(salaryPage.getMonthlyWithholding()).toHaveText(
      formatNumber(expected.annualWithholding / 12)
    );
    if (expected.monthlyNetSalaryExtra) {
      await expect(salaryPage.getMonthlyNetSalaryExtra()).toHaveText(
        formatNumber(expected.monthlyNetSalaryExtra)
      );
    }
  });
}

function parseTitle(input: Props) {
  return Object.entries(input)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
}
