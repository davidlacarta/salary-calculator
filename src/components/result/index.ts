import { $ } from "../../lib/dom";
import { Result } from "../../lib/grossToNetSalary";

export function updateResult({
  monthlyNetSalary,
  annualNetSalary,
  annualWithholding,
  annualFee,
  monthlyNetSalaryExtra,
}: Result) {
  $("#monthly-net-salary")!.textContent = formatNumber(monthlyNetSalary);
  $("#monthly-net-salary-extra")!.textContent = monthlyNetSalaryExtra
    ? formatNumber(monthlyNetSalaryExtra)
    : "";
  $("#monthly-net-salary-extra-divider")!.style.display = monthlyNetSalaryExtra
    ? "flex"
    : "none";
  $("#monthly-net-salary-extra-wrapper")!.style.display = monthlyNetSalaryExtra
    ? "flex"
    : "none";
  $("#annual-net-salary")!.textContent = formatNumber(annualNetSalary);
  $("#annual-withholding")!.textContent = formatNumber(annualWithholding);
  $("#monthly-withholding")!.textContent = formatNumber(annualWithholding / 12);
  $("#annual-fee")!.textContent = formatNumber(annualFee);
  $("#monthly-fee")!.textContent = formatNumber(annualFee / 12);
}

function formatNumber(amount: number) {
  return amount.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}
