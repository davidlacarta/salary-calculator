export interface Props {
  annualGrossSalary: number;
  annualFee: number;
  childrenNumber: number;
  disabilityPercentage: number;
}

export function calculateNetIncomeReduction({
  annualGrossSalary,
  annualFee,
  childrenNumber,
  disabilityPercentage,
}: Props) {
  const BASE_REDUCTION = 2000;
  const MIN_REDUCTION = 3700;
  const RANGE = { min: 11250, max: 14450 };
  const childrenBonus = childrenNumber > 2 ? 600 : 0;
  const netIncome = annualGrossSalary - annualFee;
  const disabilityReduction =
    calculateDisabilityReduction(disabilityPercentage);

  return (
    BASE_REDUCTION +
    disabilityReduction +
    (netIncome < RANGE.min
      ? MIN_REDUCTION
      : netIncome < RANGE.max
      ? MIN_REDUCTION - 1.15625 * (netIncome - RANGE.min)
      : 0) +
    childrenBonus
  );
}

export function calculateDisabilityReduction(disabilityPercentage: number) {
  return (
    [
      {
        from: 0,
        to: 33,
        reduction: 0,
      },
      {
        from: 33,
        to: 65,
        reduction: 3500,
      },
      {
        from: 65,
        to: Infinity,
        reduction: 7750,
      },
    ].find(
      ({ from, to }) =>
        disabilityPercentage >= from && disabilityPercentage < to
    )?.reduction ?? 0
  );
}
