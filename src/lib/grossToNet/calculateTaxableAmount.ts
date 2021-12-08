export function calculateTaxableAmount(amount: number) {
  return [
    [0, 12450, 0.19],
    [12450, 20200, 0.24],
    [20200, 35200, 0.3],
    [35200, 60000, 0.37],
    [60000, Infinity, 0.45],
  ]
    .map(([from, to, tax]) => ({ from, to, tax }))
    .reduce((sum, { from, to, tax }) => {
      const sectionTaxableAmount =
        amount < from ? 0 : amount > to ? to - from : amount - from;
      return sum + sectionTaxableAmount * tax;
    }, 0);
}
