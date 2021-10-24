import grossToNetSalary from "./grossToNetSalary";

test("With annual gross salary 30.000 should calculate the net salary", () => {
  expect(grossToNetSalary({ annualGrossSalary: 30000 })).toStrictEqual({
    monthlyNetSalary: 1929.8,
  });
});

test("With annual gross salary 45.000 should calculate the net salary", () => {
  expect(grossToNetSalary({ annualGrossSalary: 45000 })).toStrictEqual({
    monthlyNetSalary: 2720.3,
  });
});
