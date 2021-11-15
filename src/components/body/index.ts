import Form, { getFormInputs } from "../form";
import { updateResult } from "../result";
import grossToNet from "../../lib/grossToNet";

export default {
  init: () => {
    Form.init();
    window.addEventListener("input", updateGrossToNet);
  },
};

function updateGrossToNet() {
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
}