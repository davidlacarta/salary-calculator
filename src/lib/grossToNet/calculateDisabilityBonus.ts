export function calculateDisabilityBonus(disabilityPercentage: number) {
  return (
    [
      [0, 33, 0],
      [33, 65, 3000],
      [65, Infinity, 12000],
    ]
      .map(([from, to, bonus]) => ({ from, to, bonus }))
      .find(
        ({ from, to }) =>
          disabilityPercentage >= from && disabilityPercentage < to
      )?.bonus ?? 0
  );
}
