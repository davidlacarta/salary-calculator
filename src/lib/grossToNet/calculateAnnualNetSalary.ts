export function calculateAnnualNetSalary({
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
