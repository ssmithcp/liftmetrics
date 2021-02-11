import { useState } from 'react'
import { connect, useSelector } from 'react-redux'

import { save } from '../../../actions/weight'

import DecimalInput from '../../form/DecimalInput'
import SaveButtonFactory from '../../util/SaveButtonFactory'

// TODO change to 'Saved' when saved, maybe add a check mark to the button?

const Record = ({ save }) => {
  const unit = useSelector(s => s.profile.weightUnit)
  const [weight, setWeight] = useState('')

  const onSubmit = () => (
    save({
      value: weight,
      unit,
      created: Date.now(),
    })
    .then(() => setWeight(''))
  )

  const { doSave, SaveButton } = SaveButtonFactory(onSubmit)

  const pluralWeight = unit + 's'

  return (
    <form onSubmit={ doSave } className='text-center'>
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
      <SaveButton
        disabled={ weight === '' }
        tabIndex='0'
      />
    </form>
  )
}

export default connect(null, { save })(Record)