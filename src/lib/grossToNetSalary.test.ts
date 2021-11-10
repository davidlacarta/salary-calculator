import grossToNetSalary, { Props } from "./grossToNetSalary";
import { cases } from "../../tests/cases.json";

cases.forEach(({ input, expected }) =>
  test(parseTitle(input), () =>
    expect(grossToNetSalary(input)).toStrictEqual(expected)
  )
);

function parseTitle(input: Props) {
  return Object.entries(input)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
}
