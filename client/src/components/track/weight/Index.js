import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { addWeeks } from 'date-fns'

import { getWeightsFrom } from '../../../actions/weight'
import { normalize } from '../../../util/weight'

import TitledPage from '../../container/TitledPage'
import Record from './Record'
import Trends from './Trends'
import History from './History'

// convert to common units
// get weights up to 6 weeks in the past
// show weight trend: * maintaining weight * trending +.5lb per week
// show delta per weigh in
// show number of days since weigh in
// show trend between those samples
// up down buttons
// saved notification fade-in-out

const Weight = ({ getWeightsFrom }) => {
  // let weights = [
  //   { value: 180, unit: 'lb', created: parse('2/8/2021', 'MM/dd/yyyy', new Date()) },
  //   { value: 182, unit: 'lb', created: parse('2/5/2021', 'MM/dd/yyyy', new Date()) },
  //   { value: 80, unit: 'kg', created: parse('2/4/2021', 'MM/dd/yyyy', new Date()) },
  //   { value: 180, unit: 'lb', created: parse('1/28/2021', 'MM/dd/yyyy', new Date()) },
  //   { value: 200, unit: 'lb', created: parse('1/30/2021', 'MM/dd/yyyy', new Date()) },
  //   { value: 179, unit: 'lb', created: parse('12/1/2020', 'MM/dd/yyyy', new Date()) },
  //   { value: 178, unit: 'lb', created: parse('11/1/2020', 'MM/dd/yyyy', new Date()) },
  // ]

  useEffect(() => {
    getWeightsFrom(addWeeks(Date.now(), -6))
  }, [getWeightsFrom])

  const unit = useSelector(s => s.profile.weightUnit)
  const weights = useSelector(s => s.weight).map(w => normalize(w, unit)).sort((a, b) => a.created.getTime() - b.created.getTime())

  const reversed = [ ...weights ].reverse()

  return (
    <TitledPage title='Body weight' className='grid grid-cols-1 gap-6'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <Record />
        <Trends
          className='py-6 border-t md:border-t-0 md:border-l'
        />
      </div>
      <History reversed={ reversed } />
    </TitledPage>
  )
}

export default connect(null, { getWeightsFrom })(Weight)