import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import _ from 'lodash'

import { isToday, addWeeks, addMonths } from 'date-fns'

import { normalize } from '../../../util/weight'

import { IconContext } from 'react-icons'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'

const NO_CHANGE = 0.01
const LITTLE_CHANGE_DELTA = 0.1

export const round = weight => (
  Math.round(weight * 100) / 100 // optionally show 1 decimal place
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

const valueOnDate = (values, date) => {
  const match = values.find(w => w.created.getTime() === date)
  if (match) {
    return match.value
  }

  const index = _.sortedIndex(values.map(w => w.created.getTime()), date)

  if (index === values.length) {
    return values[values.length - 1].value
  }

  if (index === 0) { //shouldn't happen but to be complete
    return values[0].value
  }

  const i = values[index]
  const j = values[index - 1]

  // console.log(new Date(date).toLocaleString(), 'between ', new Date(i.date.getTime()).toLocaleString(), 'and', new Date(j.date.getTime()).toLocaleString())

  const valueDelta = i.value - j.value
  const dateDelta = i.created.getTime() - j.created.getTime()
  const targetOffset = date - j.created.getTime()

  // console.log('value delta', valueDelta)
  // console.log('offset percent', targetOffset / dateDelta)

  // linear interpolation
  return j.value + ((targetOffset / dateDelta) * valueDelta)
}

const DeltaSummary = ({ description, start, end, weights, unit }) => {
  // console.log('weight on', start.toLocaleString(), 'is', weightOnDate(weights, start.getTime()))
  const sinceLast = valueOnDate(weights, end.getTime()) - valueOnDate(weights, start.getTime())
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

const Trends = ({ className }) => {
  const unit = useSelector(s => s.profile.weightUnit)
  const unsortedWeights = useSelector(s => s.weight)

  const weights = useMemo(() =>
    unsortedWeights
      .map(w => normalize(w, unit))
      .sort((a, b) => a.created.getTime() - b.created.getTime()),
    [unsortedWeights, unit])

  const current = weights.length === 0 ? null : weights[weights.length - 1]

  if (weights.length < 2 || !isToday(current.created)) {
    return <p>Reccord a body weight to see recent trends</p>
  }

  return (
    <>
      <h3 className='text-xl text-center mb-4'>Trends</h3>
      <div>
        <DeltaSummary
          description='since last weigh in'
          start={ weights[weights.length - 2].created }
          end={ current.created }
          weights={ weights }
          unit={ unit }
        />
        <DeltaSummary
          description='since last week'
          start={ addWeeks(current.created, -1) }
          end={ current.created }
          weights={ weights }
          unit={ unit }
        />
        <DeltaSummary
          description='since last month'
          start={ addMonths(current.created, -1) }
          end={ current.created }
          weights={ weights }
          unit={ unit }
        />
      </div>
    </>
  )
}

export default Trends