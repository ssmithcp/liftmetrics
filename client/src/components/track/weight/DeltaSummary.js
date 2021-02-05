import { useContext } from 'react'

import WeightContext from './context'

const NO_CHANGE = 0.01
const LITTLE_CHANGE_DELTA = 0.1

const deltaToSummary = (weightDelta, unit, round) => {

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

const weightOnDate = (weights, date) => {

  return 0
}

const DeltaSummary = ({ description, start, end } ) => {
  const { weights, unit, round } = useContext(WeightContext)

  const sinceLast = end.value - start.value

  return <p>Since last weigh in: { `${ deltaToSummary(sinceLast, unit, round) }` }</p>
}

export default DeltaSummary