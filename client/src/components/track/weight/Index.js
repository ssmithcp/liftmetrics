import { useSelector } from 'react-redux'
import { parse } from 'date-fns'

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

const Weight = () => {
  const samples = [
    { weight: 181, unit: 'lb', date: parse('2/4/2021', 'MM/dd/yyyy', new Date()) },
    { weight: 180, unit: 'lb', date: parse('1/1/2021', 'MM/dd/yyyy', new Date()) },
    { weight: 179, unit: 'lb', date: parse('12/1/2020', 'MM/dd/yyyy', new Date()) },
    { weight: 178, unit: 'lb', date: parse('11/1/2020', 'MM/dd/yyyy', new Date()) },
  ]

  const weightUnit = useSelector(s => s.profile.weightUnit)

  return (
    <TitledPage title='Body weight' className='grid grid-cols-1 gap-6'>
      <div className='md:flex md:justify-around'>
        <Record initialWeight={ samples.length === 0 ? null : samples[0] } weightUnit={ weightUnit } />
        <Trends samples={ samples } />
      </div>
      <History samples={ samples } />
    </TitledPage>
  )
}

export default Weight