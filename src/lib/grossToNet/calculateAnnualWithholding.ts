import { divide } from "../divide";
import { calculateWithholdingFee } from "./calculateWithholdingFee";
import { FRACTION_DIGITS } from "./index";

export interface Props {
  taxBase: number;
  annualGrossSalary: number;
  childrenNumber: number;
  babiesNumber: number;
  disabilityPercentage: number;
}

export function calculateAnnualWithholding({
  taxBase,
  annualGrossSalary,
  childrenNumber,
  babiesNumber,
  disabilityPercentage,
}: Props) {
  const withholdingFee = calculateWithholdingFee({
    taxBase,
    childrenNumber,
    babiesNumber,
    disabilityPercentage,
  });

  const previousType = divide(withholdingFee, annualGrossSalary) * 100;

  const beforeWithholding = Number(
    ((previousType / 100) * annualGrossSalary).toFixed(FRACTION_DIGITS)
  );

  return (
    (Number(
      (divide(beforeWithholding, annualGrossSalary) * 100).toFixed(
        FRACTION_DIGITS
      )
    ) /
      100) *
    annualGrossSalary
  );
}
