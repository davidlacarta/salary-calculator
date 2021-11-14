export function calculateNetIncomeReduction({
  annualGrossSalary,
  annualFee,
  childrenNumber,
}: {
  annualGrossSalary: number;
  annualFee: number;
  childrenNumber: number;
}) {
  const BASE_REDUCTION = 2000;
  const MIN_REDUCTION = 3700;
  const RANGE = { min: 11250, max: 14450 };
  const childrenBonus = childrenNumber > 2 ? 600 : 0;
  const netIncome = annualGrossSalary - annualFee;

  return (
    BASE_REDUCTION +
    (netIncome < RANGE.min
      ? MIN_REDUCTION
      : netIncome < RANGE.max
      ? MIN_REDUCTION - 1.15625 * (netIncome - RANGE.min)
      : 0) +
    childrenBonus
  );
}
