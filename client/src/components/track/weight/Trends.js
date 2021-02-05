import { isToday } from 'date-fns'

import { deltaToSummary } from './utils'

const Trends = ({ samples }) => {
  if (!samples || samples.length < 2 || !isToday(samples[0].date)) {
    return <p>Reccord a body weight to see recent trends</p>
  }

  const first = samples[0]
  const unit = first.unit

  // delta since last weigh in, if weight given today
  // change in last week, today vs
  // change in last month

  const sinceLast = first.weight - samples[1].weight


  return (
    <div>
      <h3 className='text-xl'>Trends</h3>
      <p>Since last weigh in: { `${ deltaToSummary(sinceLast, unit) }` }</p>
    </div>
  )
}

export default Trends