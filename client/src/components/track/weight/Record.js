import { useState } from 'react'

import { isFloat } from 'validator'
import Input from '../../form/Input'
import Button from '../../util/Button'

// TODO change to 'Saved' when saved, maybe add a check mark to the button?

const Record = ({ current, unit }) => {
  const [weight, setWeight] = useState(current === null ? null : current.value)

  const maybeSetWeight = val => {
    if (val === '' || isFloat(val)) {
      setWeight(val)
    }
  }

  const pluralWeight = unit + 's'

  return (
    <form className='flex flex-col justify-center items-center'>
      <label htmlFor='weight' className='text-xl'>Today's weight</label>
      <div>
        <Input
          id='weight'
          placeholder={ `180${ pluralWeight }` }
          name='weight'
          value={ weight }
          onChange={ e => maybeSetWeight(e.target.value) }
          className='w-24 text-center'
        />
        <p className='ml-2 inline'>{ `${ pluralWeight }` }</p>
      </div>
      <Button
        disabled={ weight === '' }
        tabIndex='0'
      >
        Save
      </Button>
    </form>
  )
}

export default Record