import grossToNetSalary from "./grossToNetSalary";

const cases = [
  {
    input: { annualGrossSalary: 30000 },
    expected: {
      annualNetSalary: 23157,
      annualFee: 1905,
      annualWithholding: 4938,
      monthlyNetSalary: 1929.8,
      monthlyNetSalaryExtra: 0,
    },
  },
  {
    input: { annualGrossSalary: 30000, annualPaymentsNumber: 14 as 14 },
    expected: {
      annualNetSalary: 23157,
      annualFee: 1905,
      annualWithholding: 4938,
      monthlyNetSalary: 1631.4,
      monthlyNetSalaryExtra: 1790.1,
    },
  },
  {
    input: { annualGrossSalary: 45000 },
    expected: {
      monthlyNetSalary: 2720.3,
      annualNetSalary: 32643,
      annualFee: 2857.5,
      annualWithholding: 9499.5,
      monthlyNetSalaryExtra: 0,
    },
  },
  {
    input: { annualGrossSalary: 10000 },
    expected: {
      monthlyNetSalary: 766.5,
      annualNetSalary: 9197.7,
      annualWithholding: 0,
      annualFee: 802.3,
      monthlyNetSalaryExtra: 0,
    },
  },
  {
    input: { annualGrossSalary: 20000 },
    expected: {
      monthlyNetSalary: 1366,
      annualNetSalary: 16392,
      annualWithholding: 2338,
      annualFee: 1270,
      monthlyNetSalaryExtra: 0,
    },
  },
  {
    input: { annualGrossSalary: 60000 },
    expected: {
      monthlyNetSalary: 3507.8,
      annualNetSalary: 42093.6,
      annualWithholding: 15048,
      annualFee: 2858.4,
      monthlyNetSalaryExtra: 0,
    },
  },
];

cases.forEach(({ input, expected }) =>
  test(`Gross salary ${input.annualGrossSalary} should calculate the net salary`, () =>
    expect(grossToNetSalary(input)).toStrictEqual(expected))
);