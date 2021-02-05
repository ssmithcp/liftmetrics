import { useContext } from 'react'
import { isToday } from 'date-fns'

import WeightContext from './context'

import DeltaSummary from './DeltaSummary'

const Wrapper = ({ children, className = ''}) => (
  <div className={ `flex flex-col justify-center items-center ${ className }` }>
    <div>
      { children }
    </div>
  </div>
)

const Trends = ({ className }) => {
  const { weights, current } = useContext(WeightContext)

  if (weights.length < 2 || !isToday(weights[0].date)) {
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
      <h3 className='text-xl'>Trends</h3>
      <DeltaSummary
        description='since last weigh in'
        start={ weights[1].date }
        end={ current.date }
      />
    </Wrapper>
  )
}

export default Trends