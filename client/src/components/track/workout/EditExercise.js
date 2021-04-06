import { useState, useEffect } from 'react'
import { useSelector, connect } from 'react-redux'

import { getExerciseById } from '../../../actions/exercise'
import { getMovementById } from '../../../actions/movement'
import { formatName } from './MovementSelect'
import { day } from '../../../util/date'

import TitledPage from '../../container/TitledPage'
import DecimalInput from '../../form/DecimalInput'

const EditExercise = ({ match: { params: { id } }, getExerciseById, getMovementById }) => {
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

  console.log(movement)
  console.log(Object.assign({}, exercise))

  const movementString = movement
    ? (movement.missing ? 'Unknown' : formatName(movement).name)
    : ''
  const exerciseDate = exercise && exercise.created ? day(exercise.created) : ''

  return (
    <TitledPage
      title={ `Edit movement ${ movementString } on ${ exerciseDate }` }
      className='grid-cols-profile'
    >
      <p>Sets</p>
      {/* <DecimalInput /> */}
    </TitledPage>
  )
}

export default connect(null, { getExerciseById, getMovementById })(EditExercise)