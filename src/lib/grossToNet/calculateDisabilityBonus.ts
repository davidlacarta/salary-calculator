export function calculateDisabilityBonus(disabilityPercentage: number) {
  return (
    [
      {
        from: 0,
        to: 33,
        bonus: 0,
      },
      {
        from: 33,
        to: 65,
        bonus: 3000,
      },
      {
        from: 65,
        to: Infinity,
        bonus: 12000,
      },
    ].find(
      ({ from, to }) =>
        disabilityPercentage >= from && disabilityPercentage < to
    )?.bonus ?? 0
  );
}
