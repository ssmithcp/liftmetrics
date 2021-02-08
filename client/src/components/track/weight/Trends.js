import { isToday, addWeeks, addMonths } from 'date-fns'

import DeltaSummary from './DeltaSummary'

const Wrapper = ({ children, className = ''}) => (
  <div className={ `flex flex-col justify-center items-center ${ className }` }>
    <div>
      { children }
    </div>
  </div>
)

const Trends = ({ className, current, weights, unit }) => {
  if (weights.length < 2 || !isToday(current.date)) {
    return (
      <Wrapper className={ className }>
        <p>Reccord a body weight to see recent trends</p>
      </Wrapper>
    )
  }
  // delta since last weigh in, if weight given today
  // change in last week, today vs
  // change in last month

  return (
    <Wrapper className={ className }>
      <h3 className='text-xl text-center mb-4'>Trends</h3>
      <div>
        <DeltaSummary
          description='since last weigh in'
          start={ weights[weights.length - 2].date }
          end={ current.date }
          weights={ weights }
          unit={ unit }
        />
        <DeltaSummary
          description='since last week'
          start={ addWeeks(current.date, -1) }
          end={ current.date }
          weights={ weights }
          unit={ unit }
        />
        <DeltaSummary
          description='since last month'
          start={ addMonths(current.date, -1) }
          end={ current.date }
          weights={ weights }
          unit={ unit }
        />
      </div>
    </Wrapper>
  )
}

export default Trends