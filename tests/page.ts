import { Page } from "playwright-core";

class SalaryPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async home() {
    await this.page.goto("/");
  }

  async fillAnnualGrossSalary(annualGrossSalary: number) {
    await this.page.fill(
      "input[name='annual-gross-salary']",
      annualGrossSalary.toString()
    );
  }

  async clickAnnualPaymentsNumber(annualPaymentsNumber?: number) {
    await this.page.click(`text=${annualPaymentsNumber ?? "12"} pagas`);
  }

  async clickChildrenNumber(childrenNumber?: number) {
    await this.page.click(`label[for='children${childrenNumber ?? 0}']`);
  }

  async clickBabiesNumber(babiesNumber?: number) {
    await this.page.click(`label[for='babies${babiesNumber ?? 0}']`);
  }

  async clickDisabilityPercentage(disabilityPercentage?: number) {
    await this.page.click(
      `label[for='disability${
        !disabilityPercentage || disabilityPercentage < 33
          ? 0
          : disabilityPercentage < 65
          ? 33
          : 65
      }']`
    );
  }

  getMonthlyNetSalary() {
    return this.page.locator("#monthly-net-salary");
  }

  getAnnualNetSalary() {
    return this.page.locator("#annual-net-salary");
  }

  getMonthlyFee() {
    return this.page.locator("#monthly-fee");
  }

  getMonthlyWithholding() {
    return this.page.locator("#monthly-withholding");
  }

  getMonthlyNetSalaryExtra() {
    return this.page.locator("#monthly-net-salary-extra");
  }
}

export default SalaryPage;
