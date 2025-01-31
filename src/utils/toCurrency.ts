export function toCurrency(value: number): string {
  const price = value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'CLP',
  });
  return price.replace(/\,/g, '.').replace("CLP", "$")
}