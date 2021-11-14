export function calculateTaxtBase({
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
