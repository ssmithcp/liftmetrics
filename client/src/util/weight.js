const LB_TO_KG = 2.205
const KG_TO_LB = 0.453592

export const normalize = (weight, desiredUnit) => {
  if (weight.unit === desiredUnit) {
    return weight
  }

  let conversion = -1
  if (weight.unit === 'lb' && desiredUnit === 'kg') {
    conversion = LB_TO_KG
  }
  if (weight.unit === 'kg' && desiredUnit === 'lb') {
    conversion = KG_TO_LB
  }

  if (conversion === -1) {
    throw new Error(`cannot convert ${ weight.unit } to ${ desiredUnit }`)
  }

  return {
    ...weight,
    value: weight.value * conversion
  }
}