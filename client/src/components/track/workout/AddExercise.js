import { useState } from 'react'

import Input from '../../form/Input'
import Button from '../../util/Button'

const AddExercise = () => {
  const weightUnit = 'lb'
  const [saveEnabled, setSaveEnabled] = useState(false)

  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')

  const maybeSetWeight = ()  => { }

  const onSubmit = e => {
    e.preventDefault()
  }

  const pluralWeight = weightUnit + 's'

  return (
    <form>
      <label htmlFor='sets' className='text-lg'>Sets</label>
      <Input
        id='sets'
        placeholder='5'
        name='sets'
        value={ sets }
        onChange={ e => e.target.value }
        className='w-24 text-center'
      />
      <label htmlFor='reps' className='text-lg'>Reps</label>
      <Input
        id='reps'
        placeholder='5'
        name='reps'
        value={ reps }
        onChange={ e => e.target.value }
        className='w-24 text-center'
      />
      <div>
        <Input
          id='weight'
          placeholder='180'
          name='weight'
          value={ weight }
          onChange={ e => maybeSetWeight(e.target.value) }
          className='w-24 text-center'
        />
        <p className='ml-2 inline'>{ `${ pluralWeight }` }</p>
      </div>
      <input type='hidden' name='unit' value={ weightUnit } />
      <Button
        disabled={ sets === '' || !saveEnabled }
        tabIndex='0'
        onClick={ onSubmit }
      >
        Save
      </Button>
    </form>
  )
}

export default AddExercise