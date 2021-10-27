import grossToNetSalary from "./grossToNetSalary";

const $ = (element: string) => document.getElementById(element);
const $i = (element: string) => $(element) as HTMLInputElement;

const $monthlyNetSalary = $("monthly-net-salary");
const $annualGrossSalary = $i("annual-gross-salary");
const $annualGrossSalaryRange = $i("annual-gross-salary-range");

function updateMonthlyNetSalary() {
  const annualGrossSalary = Number($annualGrossSalary.value);
  const { monthlyNetSalary } = grossToNetSalary({ annualGrossSalary });
  $monthlyNetSalary!.textContent = monthlyNetSalary.toFixed();
}

function syncValueOnInput(origin: HTMLInputElement, target: HTMLInputElement) {
  origin.addEventListener("input", () => {
    target.value = origin.value;
  });
}

syncValueOnInput($annualGrossSalary, $annualGrossSalaryRange);
syncValueOnInput($annualGrossSalaryRange, $annualGrossSalary);

window.addEventListener("input", updateMonthlyNetSalary);

updateMonthlyNetSalary();
