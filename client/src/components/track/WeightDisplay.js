import { useSelector } from 'react-redux'

import { round, withCommas } from '../util/number'

export const format = (value, unit) => `${ withCommas(round(value)) }${ unit }${ value >= 1 ? 's' : ''}`

const WeightDisplay = ({ value }) => {
  const unit = useSelector(s => s.profile.weightUnit)

  return (
    <>
      { format(value, unit) }
    </>
  )
}


export default WeightDisplay