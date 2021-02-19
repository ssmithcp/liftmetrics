export const round = weight => (
  Math.round(weight * 100) / 100 // optionally show 1 decimal place
)

export const withCommas = num => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')