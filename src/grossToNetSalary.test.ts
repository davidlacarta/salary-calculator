import grossToNetSalary from "./grossToNetSalary";

const cases = [
  {
    input: { annualGrossSalary: 30000 },
    expected: {
      monthlyNetSalary: 1929.8,
      annualNetSalary: 23157,
      annualFee: 1905,
      annualWithholding: 4938,
    },
  },
  {
    input: { annualGrossSalary: 45000 },
    expected: {
      monthlyNetSalary: 2720.3,
      annualNetSalary: 32643,
      annualFee: 2857.5,
      annualWithholding: 9499.5,
    },
  },
  {
    input: { annualGrossSalary: 10000 },
    expected: {
      monthlyNetSalary: 766.5,
      annualNetSalary: 9197.7,
      annualWithholding: 0,
      annualFee: 802.3,
    },
  },
  {
    input: { annualGrossSalary: 20000 },
    expected: {
      monthlyNetSalary: 1366,
      annualNetSalary: 16392,
      annualWithholding: 2338,
      annualFee: 1270,
    },
  },
  {
    input: { annualGrossSalary: 60000 },
    expected: {
      monthlyNetSalary: 3507.8,
      annualNetSalary: 42093.6,
      annualWithholding: 15048,
      annualFee: 2858.4,
    },
  },
];

cases.forEach(({ input, expected }) =>
  test("Gross salary should calculate the net salary", () =>
    expect(grossToNetSalary(input)).toStrictEqual(expected))
);
