export function divide(dividend: number, divisor: number) {
  if (divisor === 0) {
    return dividend === 0 ? 0 : dividend > 0 ? Infinity : -Infinity;
  }

  return dividend / divisor;
}
