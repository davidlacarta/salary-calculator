export interface Props {
  annualGrossSalary: number;
}

const FRACTION_DIGITS = 2;

function grossToNetSalary({ annualGrossSalary }: Props) {
  const annualFee = calculateAnnualFee(annualGrossSalary);
  const netIncome = annualGrossSalary - annualFee;
  const netIncomeReduction = calculateNetIncomeReduction(netIncome);
  const taxBase = annualGrossSalary - annualFee - netIncomeReduction;

  const withholding = calculateWithholding({
    taxBase,
    annualGrossSalary,
  });

  const annualNetSalary =
    annualGrossSalary - annualFee - withholding * annualGrossSalary;

  return {
    monthlyNetSalary: round(annualNetSalary / 12),
    annualNetSalary: round(annualNetSalary),
  };
}

function round(amount: number) {
  return Math.round(amount * 10) / 10;
}

function calculateWithholding({
  taxBase,
  annualGrossSalary,
}: {
  taxBase: number;
  annualGrossSalary: number;
}) {
  const withholdingFee = calculateWithholdingFee(taxBase);

  const previousType = (withholdingFee / annualGrossSalary) * 100;

  const beforeWithholding = Number(
    ((previousType / 100) * annualGrossSalary).toFixed(FRACTION_DIGITS)
  );

  return (
    Number(
      ((beforeWithholding / annualGrossSalary) * 100).toFixed(FRACTION_DIGITS)
    ) / 100
  );
}

function calculateAnnualFee(annualGrossSalary: number) {
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

function calculateNetIncomeReduction(netIncome: number) {
  const BASE_REDUCTION = 2000;
  const MIN_REDUCTION = 3700;
  const RANGE = { min: 11250, max: 14450 };

  return (
    BASE_REDUCTION +
    (netIncome < RANGE.min
      ? MIN_REDUCTION
      : netIncome < RANGE.max
      ? MIN_REDUCTION - 1.15625 * (netIncome - RANGE.min)
      : 0)
  );
}

function calculateTaxableBase(taxBase: number) {
  const sections = [
    taxBase < 12450 ? taxBase * 0.19 : 12450 * 0.19,
    taxBase < 12450
      ? 0
      : taxBase > 20200
      ? (20200 - 12450) * 0.24
      : (taxBase - 12450) * 0.24,
    taxBase < 20200
      ? 0
      : taxBase > 35200
      ? (35200 - 20200) * 0.3
      : (taxBase - 20200) * 0.3,
    taxBase < 35200
      ? 0
      : taxBase > 60000
      ? (60000 - 35200) * 0.37
      : (taxBase - 35200) * 0.37,
    taxBase < 60000 ? 0 : (taxBase - 60000) * 0.45,
  ];

  return sections.reduce((sum, section) => sum + section, 0);
}

function calculateWithholdingFee(taxBase: number) {
  const withholdingFee =
    calculateTaxableBase(taxBase) - calculateTaxableBase(5550);

  return withholdingFee < 0
    ? 0
    : Number(withholdingFee.toFixed(FRACTION_DIGITS));
}

export default grossToNetSalary;
