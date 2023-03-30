export function numberToMXCurrency (number: number | string): string {
  return number.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
}
