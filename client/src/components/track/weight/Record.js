import { useState } from 'react'
import { isFloat } from 'validator'
import Input from '../../form/Input'
import Button from '../../util/Button'

import { asDay } from '../../util/date'

// TODO pressing enter submits weight

const Record = ({ initialWeight, weightUnit }) => {
  const [now] = useState(Date.now)
  const [weight, setWeight] = useState(initialWeight ? initialWeight.weight : null)

  const maybeSetWeight = val => {
    if (val === '' || isFloat(val)) {
      setWeight(val)
    }
  }

  const pluralWeight = weightUnit + 's'

  return (
    <form>
      <label htmlFor='weight'>{ `Record weight for ${ asDay(now)}` }</label>
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