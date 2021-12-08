export interface Props {
  annualGrossSalary: number;
  annualWithholding: number;
  annualPaymentsNumber: number;
  annualFee: number;
}

export function calculateMonthlyNetSalary({
  annualGrossSalary,
  annualWithholding,
  annualPaymentsNumber,
  annualFee,
}: Props) {
  const monthlyNetSalaryExtra = {
    12: 0,
    14: (annualGrossSalary - annualWithholding) / 14,
  }[<12 | 14>annualPaymentsNumber];

  const monthlyNetSalary = {
    12: (annualGrossSalary - annualFee - annualWithholding) / 12,
    14: (annualGrossSalary - annualWithholding) / 14 - annualFee / 12,
  }[<12 | 14>annualPaymentsNumber];

  return { monthlyNetSalary, monthlyNetSalaryExtra };
}
