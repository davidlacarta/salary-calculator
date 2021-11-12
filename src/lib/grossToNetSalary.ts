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

const FRACTION_DIGITS = 2;

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

function validate({
  babiesNumber,
  childrenNumber,
  annualPaymentsNumber,
}: Partial<Props>) {
  if (babiesNumber! > childrenNumber!) {
    throw Error("Invalid babies number: " + babiesNumber);
  }

  if (![12, 14].includes(annualPaymentsNumber!)) {
    throw Error("Invalid annual payments number: " + annualPaymentsNumber);
  }
}

function round(amount: number) {
  return Math.round(amount * 10) / 10;
}

function calculateTaxtBase({
  annualGrossSalary,
  annualFee,
  netIncomeReduction,
}: {
  annualGrossSalary: number;
  annualFee: number;
  netIncomeReduction: number;
}) {
  return annualGrossSalary - annualFee - netIncomeReduction;
}

function calculateAnnualWithholding({
  taxBase,
  annualGrossSalary,
  childrenNumber,
  babiesNumber,
}: {
  taxBase: number;
  annualGrossSalary: number;
  childrenNumber: number;
  babiesNumber: number;
}) {
  const withholdingFee = calculateWithholdingFee({
    taxBase,
    childrenNumber,
    babiesNumber,
  });

  const previousType = (withholdingFee / annualGrossSalary) * 100;

  const beforeWithholding = Number(
    ((previousType / 100) * annualGrossSalary).toFixed(FRACTION_DIGITS)
  );

  return (
    (Number(
      ((beforeWithholding / annualGrossSalary) * 100).toFixed(FRACTION_DIGITS)
    ) /
      100) *
    annualGrossSalary
  );
}

function calculateAnnualFee({
  annualGrossSalary,
}: {
  annualGrossSalary: number;
}) {
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

function calculateNetIncomeReduction({
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

function calculateWithholdingFee({
  taxBase,
  childrenNumber,
  babiesNumber,
}: {
  taxBase: number;
  childrenNumber: number;
  babiesNumber: number;
}) {
  const childrenBonus = calculateChildrenBonus(childrenNumber) / 2;
  const babiesBonus = calculateBabiesBonus(babiesNumber) / 2;
  const bonus = 5550 + childrenBonus + babiesBonus;
  const withholdingFee =
    calculateTaxableBase(taxBase) - calculateTaxableBase(bonus);

  return withholdingFee < 0
    ? 0
    : Number(withholdingFee.toFixed(FRACTION_DIGITS));
}

function calculateChildrenBonus(childrenNumber: number) {
  if (childrenNumber === 0) {
    return 0;
  }

  if (childrenNumber === 1) {
    return 2400;
  }

  if (childrenNumber === 2) {
    return 2400 + 2700;
  }

  if (childrenNumber === 3) {
    return 2400 + 2700 + 4000;
  }

  if (childrenNumber === 4) {
    return 2400 + 2700 + 4000 + 4500;
  }

  return 2400 + 2700 + 4000 + 4500 + 4500 * (childrenNumber - 4);
}

function calculateAnnualNetSalary({
  annualGrossSalary,
  annualFee,
  annualWithholding,
}: {
  annualGrossSalary: number;
  annualFee: number;
  annualWithholding: number;
}) {
  return annualGrossSalary - annualFee - annualWithholding;
}

function calculateMonthlyNetSalary({
  annualGrossSalary,
  annualWithholding,
  annualPaymentsNumber,
  annualFee,
}: {
  annualGrossSalary: number;
  annualWithholding: number;
  annualPaymentsNumber: number;
  annualFee: number;
}) {
  const monthlyNetSalaryExtra = {
    12: 0,
    14: (annualGrossSalary - annualWithholding) / 14,
  }[annualPaymentsNumber as 12 | 14];

  const monthlyNetSalary = {
    12: (annualGrossSalary - annualFee - annualWithholding) / 12,
    14: (annualGrossSalary - annualWithholding) / 14 - annualFee / 12,
  }[annualPaymentsNumber as 12 | 14];

  return { monthlyNetSalary, monthlyNetSalaryExtra };
}

function calculateBabiesBonus(babiesNumber: number) {
  return babiesNumber * 2800;
}

export default grossToNetSalary;
