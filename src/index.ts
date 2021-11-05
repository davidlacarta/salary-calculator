import grossToNetSalary from "./grossToNetSalary";

const $ = (element: string) => document.getElementById(element);
const $i = (element: string) => $(element) as HTMLInputElement;
const $ic = (name: string) =>
  document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement;

const $annualGrossSalary = $i("annual-gross-salary");

const $annualNetSalary = $("annual-net-salary");
const $monthlyNetSalary = $("monthly-net-salary");
const $monthlyNetSalaryExtra = $("monthly-net-salary-extra");
const $monthlyNetSalaryExtraDivider = $("monthly-net-salary-extra-divider");
const $monthlyNetSalaryExtraWrapper = $("monthly-net-salary-extra-wrapper");
const $annualGrossSalaryRange = $i("annual-gross-salary-range");
const $annualWithholding = $i("annual-withholding");
const $monthlyWithholding = $i("monthly-withholding");
const $annualFee = $i("annual-fee");
const $monthlyFee = $i("monthly-fee");

function update() {
  const annualGrossSalary = Number($annualGrossSalary.value);
  const annualPaymentsNumber = Number($ic("annual-payments-number").value) as
    | 12
    | 14;

  const {
    monthlyNetSalary,
    annualNetSalary,
    annualWithholding,
    annualFee,
    monthlyNetSalaryExtra,
  } = grossToNetSalary({
    annualGrossSalary,
    annualPaymentsNumber,
  });

  $monthlyNetSalary!.textContent = formatNumber(monthlyNetSalary);
  $monthlyNetSalaryExtra!.textContent = monthlyNetSalaryExtra
    ? formatNumber(monthlyNetSalaryExtra)
    : "";
  $monthlyNetSalaryExtraDivider!.style.display = monthlyNetSalaryExtra
    ? "flex"
    : "none";
  $monthlyNetSalaryExtraWrapper!.style.display = monthlyNetSalaryExtra
    ? "flex"
    : "none";
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
