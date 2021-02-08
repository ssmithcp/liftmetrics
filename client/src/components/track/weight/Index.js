import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { parse } from 'date-fns'

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

const Weight = () => {
  let samples = [
    { value: 180, unit: 'lb', date: parse('2/8/2021', 'MM/dd/yyyy', new Date()) },
    { value: 182, unit: 'lb', date: parse('2/5/2021', 'MM/dd/yyyy', new Date()) },
    { value: 80, unit: 'kg', date: parse('2/4/2021', 'MM/dd/yyyy', new Date()) },
    { value: 180, unit: 'lb', date: parse('1/28/2021', 'MM/dd/yyyy', new Date()) },
    { value: 200, unit: 'lb', date: parse('1/30/2021', 'MM/dd/yyyy', new Date()) },
    { value: 179, unit: 'lb', date: parse('12/1/2020', 'MM/dd/yyyy', new Date()) },
    { value: 178, unit: 'lb', date: parse('11/1/2020', 'MM/dd/yyyy', new Date()) },
  ]

  const unit = useSelector(s => s.profile.weightUnit)
  samples = samples.map(w => normalize(w, unit)).sort((a, b) => a.date.getTime() - b.date.getTime())

  const current = samples.length === 0 ? null : samples[samples.length - 1]
  const weights = samples
  const reversed = [ ...samples ].reverse()

  return (
    <TitledPage title='Body weight' className='grid grid-cols-1 gap-6'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <Record current={ current } unit={ unit }/>
        <Trends
          weights={ weights }
          current={ current }
          unit={ unit }
          className='py-6 border-t md:border-t-0 md:border-l'
        />
      </div>
      <History reversed={ reversed } />
    </TitledPage>
  )
}

export default Weight