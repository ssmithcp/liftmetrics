import { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'

import { getMovements } from '../../../actions/movement'
import { save } from '../../../actions/exercise'

import DecimalInput from '../../form/DecimalInput'
import Button from '../../util/Button'

const AddExercise = ({ getMovements, save }) => {
  const weightUnit = useSelector(s => s.profile.weightUnit)
  const movements = useSelector(s => s.movement)

  const [saveEnabled, setSaveEnabled] = useState(false)

  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')
  const [movement, setMovement] = useState('')

  useEffect(() => {
    if (movements.length > 0) {
      setMovement(movements[0].id)
    }
  }, [movements])

  useEffect(getMovements, [getMovements])

  const onSubmit = e => {
    e.preventDefault()

    save({
      movement,
      sets,
      reps,
      value: weight,
      unit: weightUnit,
    })

    setMovement(movements[0].id)
    setSets('')
    setReps('')
    setWeight('')
  }

  const pluralWeight = weightUnit + 's'

  return (
    <form className='flex flex-col items-center'>
      <div>
        <label htmlFor='movement' className='text-lg mr-4'>Movement</label>
        <select
          id='movement'
          name='movement'
          value={ movement }
          onChange={ e => setMovement(e.target.value) }
        >
          { movements.map(m =>
            <option key={ m.id } value={ m.id }>
              { m.name }
            </option>
          )}
        </select>
      </div>
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
      <input type='hidden' name='unit' value={ weightUnit } />
      <Button
        disabled={ movement === '' || sets === '' || reps === '' || weight === '' }
        tabIndex='0'
        onClick={ onSubmit }
      >
        Save
      </Button>
    </form>
  )
}

export default connect(null, { getMovements, save })(AddExercise)