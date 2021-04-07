import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { startOfToday, isSameDay, addWeeks } from 'date-fns'

import { exercisesByDay } from './utils'
import { formatName } from './MovementSelect'

import StripedRow from '../StripedRow'
import ExerciseDisplay from './ExerciseDisplay'

const LastWeeksWorkout = () => {
  const movements = useSelector(s => s.movement)
  const unit = useSelector(s => s.profile.weightUnit)
  const exercises = useSelector(s => s.exercise)

  const aWeekAgo = addWeeks(startOfToday(), -1)

  const exercisesLastWorkout = useMemo(() =>
    exercisesByDay(exercises, unit).find(e => isSameDay(aWeekAgo, e.day))
  , [aWeekAgo, exercises, unit])

  if (!exercisesLastWorkout || exercisesLastWorkout.length === 0) {
    return <p>No exercises this day last week.</p>
  }

  console.log(exercisesLastWorkout)

  return (
    <div>
      { exercisesLastWorkout.data.map((e, i) => (
        <StripedRow
          key={ e.id }
          index={ i }
          className='p-2 flex justify-between md:grid md:grid-cols-2'
        >
          <p>{ (movements[e.movement] && formatName(movements[e.movement]).name) || 'unknown' }</p>
          <ExerciseDisplay exercise={ e } />
        </StripedRow>
      ))}
    </div>
  )
}

export default LastWeeksWorkout