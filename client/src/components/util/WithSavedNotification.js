import { useState, useRef, useEffect } from 'react'

import manage from '../../util/timer'

import SavedCheckmark from './SavedCheckmark'

const WithSavedNotification = ({ Saveable }) => {
  const [showSaved, setShowSaved] = useState(false)
  const [register, unregister, clearAll] = manage(useRef([]))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clearAll, [])

  const savedNotification = () => {
    setShowSaved(true)
    const id = setTimeout(() => {
      setShowSaved(false)
      unregister(id)
    }, 5000)
    register(id)
  }

  return (
    <div className='flex'>
      <Saveable savedNotification={ savedNotification } />
      { showSaved && <SavedCheckmark /> }
    </div>
  )
}

export default WithSavedNotification