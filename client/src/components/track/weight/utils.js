const NO_CHANGE = 0.01
const LITTLE_CHANGE_DELTA = 0.1

export const deltaToSummary = (weightDelta, unit) => {
  if (Math.abs(weightDelta) < NO_CHANGE) {
    return 'no change'
  }
  if (Math.abs(weightDelta) < LITTLE_CHANGE_DELTA) {
    return 'effectively the same'
  }

  const unitDisplay = Math.abs(weightDelta) > 1
    ? (unit + 's')
    : unit

  if (weightDelta > 0) {
    return `gained ${ round(weightDelta) }${ unitDisplay }`
  }
  return `lost ${ Math.abs(round(weightDelta)) }${ unitDisplay }`
}

export const round = weight => (
  Math.round(weight * 10) / 10 // optionally show 1 decimal place
)