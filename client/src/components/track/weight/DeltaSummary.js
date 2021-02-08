import { IconContext } from 'react-icons'
import _ from 'lodash'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'

const NO_CHANGE = 0.01
const LITTLE_CHANGE_DELTA = 0.1

const round = weight => (
  Math.round(weight * 10) / 10 // optionally show 1 decimal place
)

const deltaToSummary = (weightDelta, unit) => {
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

  const index = _.sortedIndex(weights.map(w => w.date.getTime()), date)

  if (index === weights.length) {
    return weights[weights.length - 1].value
  }

  if (index === 0) { //shouldn't happen but to be complete
    return weights[0].value
  }

  const i = weights[index]
  const j = weights[index - 1]

  // console.log(new Date(date).toLocaleString(), 'between ', new Date(i.date.getTime()).toLocaleString(), 'and', new Date(j.date.getTime()).toLocaleString())

  const valueDelta = i.value - j.value
  const dateDelta = i.date.getTime() - j.date.getTime()
  const targetOffset = date - j.date.getTime()

  // console.log('value delta', valueDelta)
  // console.log('offset percent', targetOffset / dateDelta)

  // linear interpolation
  return j.value + ((targetOffset / dateDelta) * valueDelta)
}

const DeltaSummary = ({ description, start, end, weights, unit }) => {
  // console.log('weight on', start.toLocaleString(), 'is', weightOnDate(weights, start.getTime()))
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
      <p>{ `${ deltaToSummary(sinceLast, unit) } ${ description }` }</p>
    </div>
  )
}

export default DeltaSummary