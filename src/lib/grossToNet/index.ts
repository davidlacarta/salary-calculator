import { calculateAnnualFee } from "./calculateAnnualFee";
import { calculateAnnualNetSalary } from "./calculateAnnualNetSalary";
import { calculateAnnualWithholding } from "./calculateAnnualWithholding";
import { calculateMonthlyNetSalary } from "./calculateMonthlyNetSalary";
import { calculateNetIncomeReduction } from "./calculateNetIncomeReduction";
import { calculateTaxtBase } from "./calculateTaxtBase";
import { validate } from "./validate";

export interface Props {
  annualGrossSalary: number;
  annualPaymentsNumber?: number;
  childrenNumber?: number;
  babiesNumber?: number;
}

export interface Result {
  annualNetSalary: number;
  annualFee: number;
  annualWithholding: number;
  monthlyNetSalary: number;
  monthlyNetSalaryExtra: number;
}

export const FRACTION_DIGITS = 2;

function grossToNetSalary({
  annualGrossSalary,
  annualPaymentsNumber = 12,
  childrenNumber = 0,
  babiesNumber = 0,
}: Props): Result {
  validate({
    babiesNumber,
    childrenNumber,
    annualPaymentsNumber,
  });

  const annualFee = calculateAnnualFee({ annualGrossSalary });

  const netIncomeReduction = calculateNetIncomeReduction({
    annualGrossSalary,
    annualFee,
    childrenNumber,
  });

  const taxBase = calculateTaxtBase({
    annualGrossSalary,
    annualFee,
    netIncomeReduction,
  });

  const annualWithholding = calculateAnnualWithholding({
    taxBase,
    annualGrossSalary,
    childrenNumber,
    babiesNumber,
  });

  const annualNetSalary = calculateAnnualNetSalary({
    annualGrossSalary,
    annualFee,
    annualWithholding,
  });

  const { monthlyNetSalaryExtra, monthlyNetSalary } = calculateMonthlyNetSalary(
    {
      annualGrossSalary,
      annualWithholding,
      annualPaymentsNumber,
      annualFee,
    }
  );

  return {
    annualNetSalary: round(annualNetSalary),
    annualFee: round(annualFee),
    annualWithholding: round(annualWithholding),
    monthlyNetSalary: round(monthlyNetSalary),
    monthlyNetSalaryExtra: round(monthlyNetSalaryExtra),
  };
}

function round(amount: number) {
  return Math.round(amount * 10) / 10;
}

export default grossToNetSalary;
