export function calculateTaxableBase(gross: number) {
  return [
    {
      from: 0,
      to: 12450,
      tax: 0.19,
    },
    {
      from: 12450,
      to: 20200,
      tax: 0.24,
    },
    {
      from: 20200,
      to: 35200,
      tax: 0.3,
    },
    {
      from: 35200,
      to: 60000,
      tax: 0.37,
    },
    {
      from: 60000,
      to: Infinity,
      tax: 0.45,
    },
  ].reduce((sum, { from, to, tax }) => {
    const grossInTaxSection =
      gross < from ? 0 : gross > to ? to - from : gross - from;
    return sum + grossInTaxSection * tax;
  }, 0);
}
