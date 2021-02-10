import { useState } from 'react'
import { isFloat } from 'validator'

import Input from './Input'

const DecimalInput = ({ name, placeholder, value, setValue, className }) => {
  const maybeSetValue = val => {
    if (val === '' || isFloat(val)) {
      setValue(val)
    }
  }

  return (
    <Input
      id={ name }
      placeholder={ placeholder }
      inputMode='decimal' // to get an iOS decimal keyboard on mobile
      name={ name }
      value={ value }
      onChange={ e => maybeSetValue(e.target.value) }
      className={ `text-center ${ className }` }
    />
  )
}

export default DecimalInput