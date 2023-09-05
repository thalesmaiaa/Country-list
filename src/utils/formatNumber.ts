export function formatNumber(number: number) {
  const formattedNumber = number.toLocaleString() // Uses the default locale

  return formattedNumber.replaceAll(',', '.')
}
