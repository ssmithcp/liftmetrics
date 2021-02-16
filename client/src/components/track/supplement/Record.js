import { useState, useEffect, useMemo } from 'react'
import { connect, useSelector } from 'react-redux'

import { save } from '../../../actions/consumedSupplement'

import DecimalInput from '../../form/DecimalInput'
import SaveButton from '../../util/SaveButton'
import ResponsiveSelect from '../ResponsiveSelect'

const AddConsumedSupplement = ({ save }) => {
  const supplements = useSelector(s => s.supplement)

  const [supplement, setSupplement] = useState('')
  const [servings, setServings] = useState('')

  const sortedSupps = useMemo(() =>
    Object.keys(supplements)
      .map(k => supplements[k])
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  , [supplements])

  useEffect(() => {
    if (supplement === '' && sortedSupps.length > 0) {
      setSupplement(sortedSupps[0].id)
    }
  }, [sortedSupps, supplement])

  const onSubmit = () => (
    save({
      supplement,
      servings
    }).then(() => {
      setSupplement(sortedSupps[0].id)
      setServings('')
    })
  )

  return (
    <form className='flex flex-col items-center'>
      <h1 className='text-xl mb-4'>Record supplement</h1>
      <ResponsiveSelect
        name='supplement'
        value={ supplement }
        setValue={ setSupplement }
        values={ sortedSupps }
      />
      <div className='flex items-center'>
        <DecimalInput
          name='servings'
          placeholder='3'
          value={ servings }
          setValue={ setServings }
          className='w-20'
        />
        { supplement !== '' && (
          <p>x { `${ supplements[supplement].value }${ supplements[supplement].unit }` } </p>
        )}
      </div>
      <SaveButton
        doSave={ onSubmit }
        tabIndex='0'
        disabled={ servings === '' }
      />
    </form>
  )
}

export default connect(null, { save })(AddConsumedSupplement)