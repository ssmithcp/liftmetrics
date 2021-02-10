import { useState } from 'react'
import { connect, useSelector } from 'react-redux'

import { save } from '../../../actions/weight'

import DecimalInput from '../../form/DecimalInput'
import Button from '../../util/Button'

// TODO change to 'Saved' when saved, maybe add a check mark to the button?

const Record = ({ save }) => {
  const unit = useSelector(s => s.profile.weightUnit)

  const [weight, setWeight] = useState('')
  const [saveEnabled, setSaveEnabled] = useState(true)

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
    <form onSubmit={ onSubmit } className='text-center'>
      <label htmlFor='weight' className='text-xl'>Today's weight</label>
      <div>
        <DecimalInput
          name='weight'
          placeholder='180'
          value={ weight }
          setValue={ setWeight }
          className='w-24'
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