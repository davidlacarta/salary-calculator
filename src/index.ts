import grossToNetSalary from "./grossToNetSalary";

const $ = (element: string) => document.getElementById(element);
const $i = (element: string) => $(element) as HTMLInputElement;

const $monthlyNetSalary = $("monthly-net-salary");
const $annualNetSalary = $("annual-net-salary");
const $annualGrossSalary = $i("annual-gross-salary");
const $annualGrossSalaryRange = $i("annual-gross-salary-range");
const $annualWithholding = $i("annual-withholding");
const $monthlyWithholding = $i("monthly-withholding");
const $annualFee = $i("annual-fee");
const $monthlyFee = $i("monthly-fee");

function update() {
  const annualGrossSalary = Number($annualGrossSalary.value);
  const { monthlyNetSalary, annualNetSalary, annualWithholding, annualFee } =
    grossToNetSalary({
      annualGrossSalary,
    });
  $monthlyNetSalary!.textContent = formatNumber(monthlyNetSalary);
  $annualNetSalary!.textContent = formatNumber(annualNetSalary);
  $annualWithholding!.textContent = formatNumber(annualWithholding);
  $monthlyWithholding!.textContent = formatNumber(annualWithholding / 12);
  $annualFee!.textContent = formatNumber(annualFee);
  $monthlyFee!.textContent = formatNumber(annualFee / 12);
}

function formatNumber(amount: number) {
  return amount.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

function syncValueOnInput(origin: HTMLInputElement, target: HTMLInputElement) {
  origin.addEventListener("input", () => {
    target.value = origin.value;
  });
}

syncValueOnInput($annualGrossSalary, $annualGrossSalaryRange);
syncValueOnInput($annualGrossSalaryRange, $annualGrossSalary);

window.addEventListener("input", update);

update();
