import Header from "./components/header/index";
import Form, { getFormInputs } from "./components/form";
import { updateResult } from "./components/result";
import grossToNet from "./lib/grossToNet";

Header.init();
Form.init();

window.addEventListener("input", () => {
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
  } = grossToNet({
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
});
