export const formatCurrency = (amount: number) => {
  return `SBD ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    style: 'decimal'
  })}`
}