export function formatNumber(amount?: number) {
  return (
    amount?.toLocaleString("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }) ?? ""
  );
}
