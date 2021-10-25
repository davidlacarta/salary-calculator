import grossToNetSalary from "./grossToNetSalary";

const cases = [
  {
    input: { annualGrossSalary: 30000 },
    expected: { monthlyNetSalary: 1929.8 },
  },
  {
    input: { annualGrossSalary: 45000 },
    expected: { monthlyNetSalary: 2720.3 },
  },
  {
    input: { annualGrossSalary: 10000 },
    expected: { monthlyNetSalary: 766.5 },
  },
  {
    input: { annualGrossSalary: 20000 },
    expected: { monthlyNetSalary: 1366 },
  },
  {
    input: { annualGrossSalary: 60000 },
    expected: { monthlyNetSalary: 3507.8 },
  },
];

cases.forEach(({ input, expected }) =>
  test(
    "With annual gross salary " +
      input.annualGrossSalary +
      " should calculate the net salary",
    () => expect(grossToNetSalary(input)).toStrictEqual(expected)
  )
);
