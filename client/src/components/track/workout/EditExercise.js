import { useState, useEffect } from 'react'
import { useSelector, connect } from 'react-redux'

import { getExerciseById, update } from '../../../actions/exercise'
import { getMovementById } from '../../../actions/movement'
import { formatName } from './MovementSelect'
import { dayTime } from '../../../util/date'

import TitledPage from '../../container/TitledPage'
import DebouncedDecimalInput from '../../form/DebouncedDecimalInput'
import DebouncedNoteTextArea from '../../form/DebouncedNoteTextArea'
import WithSavedNotification from '../../util/WithSavedNotification'

const SaveDecimal = ({ value, setValue }) => ({ savedNotification }) => (
  <DebouncedDecimalInput
    className='w-16'
    value={ value }
    setValue={ v => setValue(v).then(savedNotification) }
  />
)

const Label = ({ children }) => (
  <div className='flex items-center'>
    { children }
  </div>
)

const SaveString = ({ value, setValue }) => ({ savedNotification }) => (
  <DebouncedNoteTextArea
    className='w-full'
    value={ value }
    setValue={ v => setValue(v).then(savedNotification) }
  />
)

const EditExercise = ({ match: { params: { id } }, getExerciseById, getMovementById, update }) => {
  const movements = useSelector(s => s.movement)
  const exercises = useSelector(s => s.exercise)

  const [exercise, setExercise] = useState(exercises.find(e => e.id === id))
  const [movement, setMovement] = useState(exercise && movements[exercise.movement])

  useEffect(() => {
    if (!exercise) {
      getExerciseById(id)
        .catch(() => setExercise({ missing: true }))
    }
  }, [exercise, id, getExerciseById])
  useEffect(() => setExercise(exercises.find(e => e.id === id)), [id, exercises])

  useEffect(() => {
    if (exercise) {
      if (movements[exercise.movement]) {
        setMovement(movements[exercise.movement])
      } else {
        getMovementById(exercise.movement)
          .catch(() => setMovement({ missing: true }))
      }
    }
  }, [exercise, movements, getMovementById])

  if (!exercise) {
    return <></>
  }
  if (exercise.missing) {
    return <p>{ `Exercise ${ id } not found` }</p>
  }

  const movementString = movement
    ? (movement.missing ? 'Unknown' : formatName(movement).name)
    : ''

  return (
    <TitledPage
      title={ `Edit exercise '${ movementString }' on ${ dayTime(exercise.created) }` }
      className='grid grid-cols-edit-exercise text-lg'
    >
      <Label>Movement</Label>
      <Label>{ movementString }</Label>
      <Label>Sets</Label>
      <WithSavedNotification Saveable={
          SaveDecimal({
            value: exercise.sets,
            setValue: v => update(id, { sets: v })
          })
        }
      />
      <Label>Reps</Label>
      <WithSavedNotification Saveable={
          SaveDecimal({
            value: exercise.reps,
            setValue: v => update(id, { reps: v })
          })
        }
      />
      <Label>{ `Weight (${ exercise.unit }s)` }</Label>
      <WithSavedNotification Saveable={
          SaveDecimal({
            value: exercise.value,
            setValue: v => update(id, { value: v })
          })
        }
      />
      <div className='col-span-2'>
        <p>Notes</p>
        <WithSavedNotification Saveable={
            SaveString({
              value: exercise.note || '',
              setValue: v => update(id, { note: v })
            })
          }
          className='flex-col'
        />
      </div>
    </TitledPage>
  )
}

export default connect(null, { getExerciseById, getMovementById, update })(EditExercise)
