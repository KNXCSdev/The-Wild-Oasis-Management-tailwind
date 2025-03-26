export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value,
  );
