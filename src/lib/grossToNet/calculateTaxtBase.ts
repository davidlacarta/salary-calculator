export interface Props {
  annualGrossSalary: number;
  annualFee: number;
  netIncomeReduction: number;
}

export function calculateTaxtBase({
  annualGrossSalary,
  annualFee,
  netIncomeReduction,
}: Props) {
  return annualGrossSalary - annualFee - netIncomeReduction;
}
