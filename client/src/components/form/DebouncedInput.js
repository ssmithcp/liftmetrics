import { useState, useRef, useEffect } from 'react'

import manage from '../../util/timer'

const DebouncedInput = ({ delay = 1500, Input, value, setValue, ...rest}) => {
  const [eagerValue, setEagerValue] = useState(value)
  const [register, unregister, clearAll] = manage(useRef([]))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clearAll, [])

  const setAndDelay = v => {
    clearAll()()
    setEagerValue(v)
    const id = setTimeout(() => {
      setValue(v)
      unregister(id)
    }, delay)
    register(id)
  }

  return <Input
    value={ eagerValue }
    setValue={ setAndDelay }
    { ...rest }
  />
}

export default DebouncedInput
