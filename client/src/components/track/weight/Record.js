import { useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { isFloat } from 'validator'

import { save } from '../../../actions/weight'

import Input from '../../form/Input'
import Button from '../../util/Button'

// TODO change to 'Saved' when saved, maybe add a check mark to the button?

const Record = ({ save }) => {
  const unit = useSelector(s => s.profile.weightUnit)

  const [weight, setWeight] = useState('')
  const [saveEnabled, setSaveEnabled] = useState(true)

  const maybeSetWeight = val => {
    if (val === '' || isFloat(val)) {
      setWeight(val)
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    setSaveEnabled(false)

    const enableSaveButton = () => setSaveEnabled(true)

    save({
      value: weight,
      unit,
      created: Date.now(),
    })
    .then(() => {
      setWeight('')
      enableSaveButton()
    },
    enableSaveButton)
  }

  const pluralWeight = unit + 's'

  return (
    <form onSubmit={ onSubmit }>
      <label htmlFor='weight' className='text-xl'>Today's weight</label>
      <div>
        <Input
          id='weight'
          inputMode='numeric'
          placeholder='180'
          name='weight'
          value={ weight }
          onChange={ e => maybeSetWeight(e.target.value) }
          className='w-24 text-center'
        />
        <p className='ml-2 inline'>{ `${ pluralWeight }` }</p>
      </div>
      <Button
        disabled={ weight === '' || !saveEnabled }
        tabIndex='0'
        onClick={ onSubmit }
      >
        Save
      </Button>
    </form>
  )
}

export default connect(null, { save })(Record)