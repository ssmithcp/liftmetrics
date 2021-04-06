import { useState, useRef, useEffect } from 'react'

import manage from '../../util/timer'

import SavedCheckmark from './SavedCheckmark'

const WithSavedNotification = ({ Saveable, duration = 5000, className = '' }) => {
  const [showSaved, setShowSaved] = useState(false)
  const [register, unregister, clearAll] = manage(useRef([]))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clearAll, [])

  const savedNotification = () => {
    setShowSaved(true)
    const id = setTimeout(() => {
      setShowSaved(false)
      unregister(id)
    }, duration)
    register(id)
  }

  return (
    <div className={ `flex items-center ${ className }` }>
      <Saveable savedNotification={ savedNotification } />
      { showSaved && <SavedCheckmark /> }
    </div>
  )
}

export default WithSavedNotification
