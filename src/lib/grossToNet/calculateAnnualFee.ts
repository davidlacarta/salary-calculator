export interface Props {
  annualGrossSalary: number;
}

export function calculateAnnualFee({ annualGrossSalary }: Props) {
  const FEE = 0.0635;
  const MONTHLY_RANGE = { min: 1052.9, max: 3751.2 };

  const monthlyGrossSalary = annualGrossSalary / 12;
  const monthlyGrossSalaryInRange =
    monthlyGrossSalary < MONTHLY_RANGE.min
      ? MONTHLY_RANGE.min
      : monthlyGrossSalary > MONTHLY_RANGE.max
      ? MONTHLY_RANGE.max
      : monthlyGrossSalary;

  return monthlyGrossSalaryInRange * 12 * FEE;
}
