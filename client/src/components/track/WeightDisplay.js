import { useSelector } from 'react-redux'

const round = weight => (
  Math.round(weight * 100) / 100 // optionally show 1 decimal place
)

const withCommas = num => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

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