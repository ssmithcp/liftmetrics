import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { startOfDay, isToday } from 'date-fns'
import { NavLink } from 'react-router-dom'

import routes from '../../navigation'
import { day } from '../../util/date'
import { normalize } from '../../../util/weight'

import { format } from '../WeightDisplay'
import StripedRow from '../StripedRow'
import EditPencil from '../EditPencil'

const DayOfExercise = ({ day: d, movements }) => (
  <div className='mb-8'>
    <div className='flex items-center justify-between md:grid md:grid-cols-2'>
      <h3 className='mb-2 text-xl'>
        { isToday(d.day) ? 'Today\'s workout'  : `Workout on ${ day(d.day) }` }
      </h3>
      <p className='text-right md:text-left'>
        { `Total volume: ${ format(d.data.reduce((i, e) => i + (e.sets * e.reps * e.value), 0), d.data[0].unit) }` }
      </p>
    </div>
    { d.data.map((e, index) => (
        <StripedRow key={ e.created.getTime() } index={ index }>
          <NavLink
            exact
            to={ routes.trackEditExercise.toPath(e.id) }
            className='p-2 flex justify-between md:grid md:grid-cols-2'
          >
            <div className='flex items-center -ml-3 md:ml-0'>
              <EditPencil />
              { (movements[e.movement] && movements[e.movement].name)  || 'unknown' }
            </div>
            <div className='flex items-center text-right md:text-left'>
              <p className='inline'>{ `${ e.sets } x ${ e.reps } x ${ format(e.value, e.unit) }` }</p>
              <p className='hidden md:inline'>&nbsp;{ `= ${ format(e.sets * e.reps * e.value, e.unit) }` }</p>
            </div>
          </NavLink>
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