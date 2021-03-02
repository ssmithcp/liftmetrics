import { useState, useEffect, useMemo } from 'react'
import { connect, useSelector } from 'react-redux'

import { save } from '../../../actions/exercise'
import { normalize } from '../../../util/weight'

import DecimalInput from '../../form/DecimalInput'
import SaveButton from '../../util/SaveButton'
import MovementSelect from './MovementSelect'
import routes from '../../navigation'
import InternalLink from '../../navigation/InternalLink'
import ExerciseDisplay from './ExerciseDisplay'

const AddExercise = ({ save }) => {
  const weightUnit = useSelector(s => s.profile.weightUnit)
  const movements = useSelector(s => s.movement)
  const exercises = useSelector(s => s.exercise)
  const unit = useSelector(s => s.profile.weightUnit)

  const [movement, setMovement] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')
  const [note, setNote] = useState('')


  const sortedMovements = useMemo(() =>
      Object.keys(movements)
        .map(k => movements[k])
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    , [movements])

  const lastExercise = useMemo(() => {
    let found = exercises
      .sort((a, b) => b.created.getTime() - a.created.getTime())
      .find(e => e.movement === movement)
    if (found) {
      found = normalize(found, unit)
    }
    return found
  }, [unit, movement, exercises])

  useEffect(() => {
    if (movement === '' && sortedMovements.length > 0) {
      setMovement(sortedMovements[0].id)
    }
  }, [sortedMovements, movement])

  const onSubmit = () => {
    const body = {
      movement,
      sets,
      reps,
      value: weight,
      unit: weightUnit,
    }

    if (note && note.trim().length > 0) {
      body.note = note
    }

    return save(body).then(() => {
      setMovement(sortedMovements[0].id)
      setSets('')
      setReps('')
      setWeight('')
      setNote('')
    })
  }

  const pluralWeight = weightUnit + 's'

console.log(lastExercise)

  return (
    <div>
      <form className='flex flex-col items-center'>
        <h1 className='text-xl mb-4'>Record exercise</h1>
        <MovementSelect
          movement={ movement }
          setMovement={ setMovement }
          movements={ sortedMovements }
        />
        { lastExercise && (
          <div className='mt-2'>
            <div className='flex'>
              <p>Last session:&nbsp;</p>
              <ExerciseDisplay exercise={ lastExercise } />
            </div>
            { lastExercise.note && (
              <p>{ lastExercise.note }</p>
            )}
          </div>
        )}
        <div>
          <DecimalInput
            name='sets'
            placeholder='5'
            value={ sets }
            setValue={ setSets }
            className='w-12'
          />
          <label htmlFor='reps' className='text-lg'>x</label>
          <DecimalInput
            name='reps'
            placeholder='5'
            value={ reps }
            setValue={ setReps }
            className='w-14'
          />
          <label htmlFor='weight' className='text-lg'>@</label>
          <DecimalInput
            name='weight'
            placeholder='225'
            value={ weight }
            setValue={ setWeight }
            className='w-16'
          />
          <p className='ml-2 inline'>{ `${ pluralWeight }` }</p>
        </div>
        <textarea
          name='note'
          value={ note }
          onChange={ e => setNote(e.target.value) }
          rows='2'
          cols='35'
          placeholder='Notes'
          autocomplete='off'
          autocorrect='off'
          autocapitalize='off'
          className='border border-gray-400 p-2 focus:outline-none focus:border-black'
        />
        <SaveButton
          doSave={ onSubmit }
          tabIndex='0'
          disabled={ movement === '' || sets === '' || reps === '' || weight === '' }
        />
      </form>
      <InternalLink
        className='float-right mt-3'
        route={ routes.trackEditMovement }
      />
    </div>
  )
}

export default connect(null, { save })(AddExercise)