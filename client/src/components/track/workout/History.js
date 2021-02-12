import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { startOfDay, isToday } from 'date-fns'

import { day } from '../../util/date'
import { normalize } from '../../../util/weight'

import StripedRow from '../StripedRow'
import EditPencil from '../EditPencil'

// show commas in total
// link to 'edit exercise' page on click

const DayOfExercise = ({ day: d, movements }) => (
  <div className='mb-8'>
    <h3 className='mb-2 text-xl'>
      { isToday(d.day) ? 'Today\'s workout'  : `Workout on ${ day(d.day) }` }
    </h3>
    { d.data.map((e, index) => (
        <StripedRow
          key={ e.created.getTime() }
          index={ index }
          className='p-2 flex justify-between md:grid md:grid-cols-2 '
        >
          <div className='flex items-center'>
            <EditPencil />
            { (movements[e.movement] && movements[e.movement].name)  || 'unknown' }
          </div>
          <div className='flex items-center text-right md:text-left'>
            <p className='inline'>{ `${ e.sets } x ${ e.reps } x ${ e.value }${ e.unit }s` }</p>
            <p className='hidden md:inline'>&nbsp;{ `= ${ e.sets * e.reps * e.value }${ e.unit }s` }</p>
          </div>
        </StripedRow>
    ))}
  </div>
)

const History = () => {
  const movements = useSelector(s => s.movement)
  const unit = useSelector(s => s.profile.weightUnit)
  const exercises = useSelector(s => s.exercise)

  const exercisesByDay = useMemo(() => (
    Object.values(
        exercises
        .map(w => normalize(w, unit))
        .reduce((a, v) => {
          const day = startOfDay(v.created)

          a[day] = a[day] || { day, data: [] }
          a[day].data.push(v)

          return a
        }, {}))
      .sort((a, b) => b.day.getTime() - a.day.getTime())
      .map(d => ({
        day: d.day,
        data: d.data.sort((a, b) => a.created.getTime() - b.created.getTime()),
      }))
  ), [exercises, unit])

  return (
    <div>
      { exercisesByDay.map(d =>
          <DayOfExercise
            key={ d.day.getTime() }
            day={ d }
            movements={ movements }
          />
      )}
    </div>
  )
}

export default History