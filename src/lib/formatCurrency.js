export function formatCurrency(value, locale = 'en-US', currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
  }).format(Number(value) || 0);
}
