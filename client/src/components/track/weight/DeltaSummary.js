import { useContext } from 'react'
import { IconContext } from 'react-icons'
import { BsArrowDown, BsArrowUp} from 'react-icons/bs'

import WeightContext from './context'

const NO_CHANGE = 0.01
const LITTLE_CHANGE_DELTA = 0.1

const deltaToSummary = (weightDelta, unit, round) => {

  if (Math.abs(weightDelta) < NO_CHANGE) {
    return 'No change'
  }
  if (Math.abs(weightDelta) < LITTLE_CHANGE_DELTA) {
    return 'Effectively the same'
  }

  const unitDisplay = Math.abs(weightDelta) > 1
    ? (unit + 's')
    : unit

  if (weightDelta > 0) {
    return `Gained ${ round(weightDelta) }${ unitDisplay }`
  }
  return `Lost ${ Math.abs(round(weightDelta)) }${ unitDisplay }`
}

const weightOnDate = (weights, date) => {
  const match = weights.find(w => w.date.getTime() === date)
  if (match) {
    return match.value
  }

  return 0
}

const DeltaSummary = ({ description, start, end } ) => {
  const { weights, unit, round } = useContext(WeightContext)

  const sinceLast = weightOnDate(weights, end.getTime()) - weightOnDate(weights, start.getTime())
  const iconStyle = 'inline-block h-6 w-6 mr-2'

  return (
    <div className='py-2 flex items-center'>
      { Math.abs(sinceLast) > LITTLE_CHANGE_DELTA && (
        sinceLast > 0
          ? (
            <IconContext.Provider value={{ className: `${ iconStyle } text-red-600` }}>
              <BsArrowUp />
            </IconContext.Provider>
          )
          : (
            <IconContext.Provider value={{ className: `${ iconStyle } text-blue-600` }}>
              <BsArrowDown />
            </IconContext.Provider>
          )
      )}
      <p>{ `${ deltaToSummary(sinceLast, unit, round) } ${ description }` }</p>
    </div>
  )
}

export default DeltaSummary