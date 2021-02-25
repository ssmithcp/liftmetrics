import { format } from '../WeightDisplay'

const ExerciseDisplay = ({ exercise }) => (
  <>
    <p className='inline'>{ `${ exercise.sets } x ${ exercise.reps } x ${ format(exercise.value, exercise.unit) }` }</p>
    <p className='hidden md:inline'>&nbsp;{ `= ${ format(exercise.sets * exercise.reps * exercise.value, exercise.unit) }` }</p>
  </>
)

export default ExerciseDisplay