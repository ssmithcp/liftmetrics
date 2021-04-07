import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { isToday } from 'date-fns'

import routes from '../../navigation'
import { day } from '../../../util/date'
import { exercisesByDay } from './utils'

import { format } from '../WeightDisplay'
import { formatName } from './MovementSelect'
import TitledHistory from '../TitledHistory'
import ExerciseDisplay from './ExerciseDisplay'

const DayOfExercise = ({ day: d, movements, offset }) => (
  <div className='mb-8'>
    <div className='flex items-center justify-between md:grid md:grid-cols-2'>
      <h3 className='mb-2 text-xl'>
        { isToday(d.day) ? 'Today\'s workout'  : day(d.day) }
      </h3>
      <p className='text-right md:text-left'>
        { `Total volume: ${ format(d.data.reduce((i, e) => i + (e.sets * e.reps * e.value), 0), d.data[0].unit) }` }
      </p>
    </div>
    { movements && Object.keys(movements).length > 0 && (
        <TitledHistory
          rowData={ d.data }
          toPath={ e => routes.trackEditExercise.toPath(e.id) }
          renderName={ e => (movements[e.movement] && formatName(movements[e.movement]).name) || 'unknown' }
          renderDescription={ e => <ExerciseDisplay exercise={ e } />}
          indexOffset={ offset }
        />
    )}
  </div>
)

const History = () => {
  const movements = useSelector(s => s.movement)
  const unit = useSelector(s => s.profile.weightUnit)
  const exercises = useSelector(s => s.exercise)
  const ebd = useMemo(() => exercisesByDay(exercises, unit), [exercises, unit])

  let offset = 0

  return (
    <div>
      { ebd.map(d => {
          const oldOffset = offset
          offset += d.data.length

          return <DayOfExercise
            key={ d.day.getTime() }
            day={ d }
            movements={ movements }
            offset={ oldOffset }
          />
      })}
    </div>
  )
}

export default History