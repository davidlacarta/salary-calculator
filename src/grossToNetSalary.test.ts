import grossToNetSalary from "./grossToNetSalary";

const cases = [
  {
    input: { annualGrossSalary: 30000 },
    expected: { monthlyNetSalary: 1929.8, annualNetSalary: 23157 },
  },
  {
    input: { annualGrossSalary: 45000 },
    expected: { monthlyNetSalary: 2720.3, annualNetSalary: 32643 },
  },
  {
    input: { annualGrossSalary: 10000 },
    expected: { monthlyNetSalary: 766.5, annualNetSalary: 9197.7 },
  },
  {
    input: { annualGrossSalary: 20000 },
    expected: { monthlyNetSalary: 1366, annualNetSalary: 16392 },
  },
  {
    input: { annualGrossSalary: 60000 },
    expected: { monthlyNetSalary: 3507.8, annualNetSalary: 42093.6 },
  },
];

cases.forEach(({ input, expected }) =>
  test("Gross salary should calculate the net salary", () =>
    expect(grossToNetSalary(input)).toStrictEqual(expected))
);
