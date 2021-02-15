import { useState, useEffect, useMemo } from 'react'
import { connect, useSelector } from 'react-redux'

import { save } from '../../../actions/exercise'

import DecimalInput from '../../form/DecimalInput'
import SaveButton from '../../util/SaveButton'

const AddExercise = ({ save }) => {
  const weightUnit = useSelector(s => s.profile.weightUnit)
  const movements = useSelector(s => s.movement)

  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')
  const [movement, setMovement] = useState('')

  const sortedMovements = useMemo(() =>
    Object.keys(movements)
      .map(k => movements[k])
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  , [movements])

  useEffect(() => {
    if (movement === '' && sortedMovements.length > 0) {
      setMovement(sortedMovements[0].id)
    }
  }, [sortedMovements, movement])

  const onSubmit = () => (
    save({
      movement,
      sets,
      reps,
      value: weight,
      unit: weightUnit,
    }).then(() => {
      setMovement(sortedMovements[0].id)
      setSets('')
      setReps('')
      setWeight('')
    })
  )

  const pluralWeight = weightUnit + 's'

  return (
    <form className='flex flex-col items-center'>
      <h1 className='text-xl mb-4'>Record exercise</h1>
      <select
        id='movement'
        name='movement'
        value={ movement }
        onChange={ e => setMovement(e.target.value) }
        className='text-xl'
      >
        { sortedMovements.map(m =>
          <option key={ m.id } value={ m.id }>
            { m.name.length <= 34
              ? m.name
              : m.name.substring(0, 31) + '...'
            }
          </option>
        )}
      </select>
      <div>
        <label htmlFor='sets' className='text-lg'>Sets</label>
        <DecimalInput
          name='sets'
          placeholder='5'
          value={ sets }
          setValue={ setSets }
          className='w-16'
        />
        <label htmlFor='reps' className='text-lg'>Reps</label>
        <DecimalInput
          name='reps'
          placeholder='5'
          value={ reps }
          setValue={ setReps }
          className='w-16'
        />
      </div>
      <div>
        <DecimalInput
          name='weight'
          placeholder='225'
          value={ weight }
          setValue={ setWeight }
          className='w-24'
        />
        <p className='ml-2 inline'>{ `${ pluralWeight }` }</p>
      </div>
      <SaveButton
        doSave={ onSubmit }
        tabIndex='0'
        disabled={ movement === '' || sets === '' || reps === '' || weight === '' }
      />
    </form>
  )
}

export default connect(null, { save })(AddExercise)