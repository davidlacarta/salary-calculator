export interface Props {
  annualGrossSalary: number;
  annualFee: number;
  annualWithholding: number;
}

export function calculateAnnualNetSalary({
  annualGrossSalary,
  annualFee,
  annualWithholding,
}: Props) {
  return annualGrossSalary - annualFee - annualWithholding;
}
