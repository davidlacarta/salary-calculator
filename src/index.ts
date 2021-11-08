import grossToNetSalary from "./lib/grossToNetSalary";
import { getFormInputs } from "./components/form";
import { updateResult } from "./components/result";

window.addEventListener("input", update);

function update() {
  const {
    annualGrossSalary,
    annualPaymentsNumber,
    childrenNumber,
    babiesNumber,
  } = getFormInputs();

  const {
    monthlyNetSalary,
    annualNetSalary,
    annualWithholding,
    annualFee,
    monthlyNetSalaryExtra,
  } = grossToNetSalary({
    annualGrossSalary,
    annualPaymentsNumber,
    childrenNumber,
    babiesNumber,
  });

  updateResult({
    monthlyNetSalary,
    annualNetSalary,
    annualWithholding,
    annualFee,
    monthlyNetSalaryExtra,
  });
}
