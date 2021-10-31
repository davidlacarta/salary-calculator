import grossToNetSalary from "./grossToNetSalary";

const $ = (element: string) => document.getElementById(element);
const $i = (element: string) => $(element) as HTMLInputElement;

const $monthlyNetSalary = $("monthly-net-salary");
const $annualNetSalary = $("annual-net-salary");
const $annualGrossSalary = $i("annual-gross-salary");
const $annualGrossSalaryRange = $i("annual-gross-salary-range");

function update() {
  const annualGrossSalary = Number($annualGrossSalary.value);
  const { monthlyNetSalary, annualNetSalary } = grossToNetSalary({
    annualGrossSalary,
  });
  $monthlyNetSalary!.textContent = formatNumber(monthlyNetSalary);
  $annualNetSalary!.textContent = formatNumber(annualNetSalary);
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
