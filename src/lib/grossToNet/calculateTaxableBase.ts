export function calculateTaxableBase(taxBase: number) {
  const sections = [
    taxBase < 12450 ? taxBase * 0.19 : 12450 * 0.19,
    taxBase < 12450
      ? 0
      : taxBase > 20200
      ? (20200 - 12450) * 0.24
      : (taxBase - 12450) * 0.24,
    taxBase < 20200
      ? 0
      : taxBase > 35200
      ? (35200 - 20200) * 0.3
      : (taxBase - 20200) * 0.3,
    taxBase < 35200
      ? 0
      : taxBase > 60000
      ? (60000 - 35200) * 0.37
      : (taxBase - 35200) * 0.37,
    taxBase < 60000 ? 0 : (taxBase - 60000) * 0.45,
  ];

  return sections.reduce((sum, section) => sum + section, 0);
}
