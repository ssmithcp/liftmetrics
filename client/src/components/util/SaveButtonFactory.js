import { useState, useRef } from 'react'

import Button from './Button'

const SaveButton = ({ doSave, disabled, ...rest }) => {
  const [saveEnabled, setSaveEnabled] = useState(true)
  const [displayedState, setDisplayedState] = useState('save')

  const xhrCompleted = useRef(false)
  const showSavingMin = useRef(-1)
  const showTimeoutAt = useRef(-1)

  const maybeUpdateDisplayedState = finished => {
    const now = Date.now()
    let done = false

    // console.log('timer firing, curentState', xhrCompleted.current, showTimeoutAt.current, now)

    if (xhrCompleted.current && showSavingMin.current <= now) {
      setDisplayedState('saved')
      done = true
    } else if (!xhrCompleted.current && showTimeoutAt.current <= now) {
      setDisplayedState('timedout')
      done = true
    }

    if (done) {
      setSaveEnabled(true)
      setTimeout(() => setDisplayedState('save'), 5000)
      finished()
    }
  }

  const beginWatchState = () => {
    setSaveEnabled(false)

    setDisplayedState('saving')
    xhrCompleted.current = false

    showSavingMin.current = Date.now() + 500
    showTimeoutAt.current = Date.now() + 5000

    const id = setInterval(
      () => maybeUpdateDisplayedState(() => clearInterval(id)),
      300
    )
  }

  const onClick = e => {
    if (e) {
      e.preventDefault()
    }

    beginWatchState()
    const finished = () => xhrCompleted.current = true
    doSave()
      .then(finished, finished)
  }

  return (
    <Button
      { ...rest }
      disabled={ disabled || !saveEnabled }
      onClick={ onClick }
    >
      { displayedState === 'save' && <p>Save</p> }
      { displayedState === 'saving' && (
        <p>Saving...</p>
      )}
      { displayedState === 'saved' && (
        <p>Saved!</p>
      )}
      { displayedState === 'timedout' && <p>Save timed out, try again later!</p> }
    </Button>
  )
}

export default SaveButton