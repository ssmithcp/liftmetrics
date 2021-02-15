import { useState, useEffect, useMemo } from 'react'
import { connect, useSelector } from 'react-redux'

import { save } from '../../../actions/measurement'

import DecimalInput from '../../form/DecimalInput'
import SaveButton from '../../util/SaveButton'
import ResponsiveSelect from '../ResponsiveSelect'

const AddMeasurement = ({ save }) => {
  const lengthUnit = useSelector(s => s.profile.lengthUnit)
  const sites = useSelector(s => s.measurementSite)

  const [site, setSite] = useState('')
  const [side, setSide] = useState('N/A')
  const [flexed, setFlexed] = useState(false)
  const [length, setLength] = useState('')

  const sortedSites = useMemo(() =>
    Object.keys(sites)
      .map(k => sites[k])
      .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
  , [sites])

  useEffect(() => {
    if (site === '' && sortedSites.length > 0) {
      setSite(sortedSites[0].id)
    }
  }, [sortedSites, site])

  const onSubmit = () => (
    save({
      site,
      value: length,
      side,
      flexed,
      unit: lengthUnit,
    }).then(() => {
      setSite(sortedSites[0].id)
      setSide('N/A')
      setFlexed(false)
      setLength('')
    })
  )

  const onSideChange = e => setSide(e.target.value)

  const pluralLength = lengthUnit + 's'

  return (
    <form className='flex flex-col items-center'>
      <h1 className='text-xl mb-4'>Record measurement</h1>
      <ResponsiveSelect
        name='site'
        value={ site }
        setValue={ setSite }
        values={ sortedSites }
      />
      <div className='flex items-center text-xl mt-5'>
        <p>Side:</p>
        <input type='radio' id='right-side' name='side' value='right' className='ml-4 mr-2' onChange={ onSideChange } />
        <label htmlFor='right-side'>Right</label>
        <input type='radio' id='left-side' name='side' value='left' className='ml-4 mr-2' onChange={ onSideChange } />
        <label htmlFor='left-side'>Left</label>
        <input type='radio' id='no-side' name='side' value='N/A' className='ml-4 mr-2' onChange={ onSideChange } checked={ side === 'N/A' }/>
        <label htmlFor='no-side'>N/A</label>
      </div>
      <div className='flex items-center text-xl mt-5'>
        <p>Flexed</p>
        <input type='checkbox' name='flexed' className='ml-3' onChange={ e => setFlexed(e.target.checked)} />
      </div>
      <div>
        <DecimalInput
          name='length'
          placeholder='18'
          value={ length }
          setValue={ setLength }
          className='w-24'
        />
        <p className='ml-2 inline'>{ `${ pluralLength }` }</p>
      </div>
      <SaveButton
        doSave={ onSubmit }
        tabIndex='0'
        disabled={ length === '' }
      />
    </form>
  )
}

export default connect(null, { save })(AddMeasurement)