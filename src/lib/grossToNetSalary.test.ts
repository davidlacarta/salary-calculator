import grossToNetSalary from "./grossToNetSalary";
import { cases } from "../../tests/cases.json";

test.concurrent.each(cases)("%o", async ({ input, expected }) => {
  expect(grossToNetSalary(input)).toStrictEqual(expected);
});

test("Invalid payments number", () => {
  expect(() =>
    grossToNetSalary({ annualGrossSalary: 30000, annualPaymentsNumber: 15 })
  ).toThrow(Error("Invalid annual payments number: " + 15));
});

test("Invalid babies number", () => {
  expect(() =>
    grossToNetSalary({
      annualGrossSalary: 30000,
      childrenNumber: 2,
      babiesNumber: 3,
    })
  ).toThrow(Error("Invalid babies number: " + 3));
});
