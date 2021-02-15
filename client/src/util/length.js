const IN_TO_CM = 2.54
const CM_TO_IN = 1 / IN_TO_CM

export const normalize = (length, desiredUnit) => {
  if (length.unit === desiredUnit) {
    return length
  }

  let conversion = -1
  if (length.unit === 'in' && desiredUnit === 'cm') {
    conversion = IN_TO_CM
  }
  if (length.unit === 'cm' && desiredUnit === 'in') {
    conversion = CM_TO_IN
  }

  if (conversion === -1) {
    throw new Error(`cannot convert ${ length.unit } to ${ desiredUnit }`)
  }

  return {
    ...length,
    value: length.value * conversion,
    unit: desiredUnit,
  }
}