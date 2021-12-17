import Form, { getFormInputs } from "../form";
import { updateResult } from "../result";
import grossToNet from "../../lib/grossToNet";

export default {
  init: ({
    minimal = false,
    embed = false,
  }: { minimal?: boolean; embed?: boolean } = {}) => {
    Form.init({ minimal, embed });
    window.addEventListener("input", () => updateGrossToNet({ minimal }));
  },
};

function updateGrossToNet({ minimal }: { minimal: boolean }) {
  const {
    annualGrossSalary,
    annualPaymentsNumber,
    childrenNumber,
    babiesNumber,
    disabilityPercentage,
  } = getFormInputs({ minimal });

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
    disabilityPercentage,
  });

  updateResult({
    monthlyNetSalary,
    annualNetSalary,
    annualWithholding,
    annualFee,
    monthlyNetSalaryExtra,
  });
}
