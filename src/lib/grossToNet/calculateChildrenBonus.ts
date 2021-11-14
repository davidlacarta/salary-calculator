export function calculateChildrenBonus(childrenNumber: number) {
  return Array(childrenNumber + 1)
    .fill(null)
    .reduce(
      (sum, _, childNumber) =>
        sum +
        ({
          0: 0,
          1: 2400,
          2: 2700,
          3: 4000,
          4: 4500,
        }[childNumber] ?? 4500),
      0
    );
}
