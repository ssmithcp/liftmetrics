import { useState, useRef } from 'react'

import Button from './Button'

// "Saving " (twirl) // 500ms minimum
// "Save timed out, try again later" // after 5 seconds
// "Saved " (Green check) // 2000 ms
// Save

const SaveButtonFactory = (doSave) => {
  const [saveEnabled, setSaveEnabled] = useState(true)
  const [displayedState, setDisplayedState] = useState('save')

  const actualState = useRef('save')
  const showSavingMin = useRef(-1)
  const showTimeoutAt = useRef(-1)

  const updateState = finished => {
    const now = Date.now()

    console.log('timer firing, curentState', actualState.current, showSavingMin.current, now)

    if (actualState.current === 'saved' && showSavingMin.current <= now) {
      setDisplayedState('saved')

      actualState.current = 'save'
      setTimeout(() => setDisplayedState('save'), 5000)
    } else if (actualState.current === 'saving' && showTimeoutAt.current <= now) {
      setDisplayedState('timedout')

      actualState.current = 'save'
      setTimeout(() => setDisplayedState('save'), 5000)
    }

    const done = actualState.current === 'save'
    if (done) {
      setSaveEnabled(true)
      showSavingMin.current = -1
      showTimeoutAt.current = -1

      finished()
    }
  }

  const watchState = () => {
    const id = setInterval(() => updateState(() => clearInterval(id)), 300)
  }

  const startSaving = () => {
    setSaveEnabled(false)

    setDisplayedState('saving')
    actualState.current = 'saving'

    showSavingMin.current = Date.now() + 1000
    showTimeoutAt.current = Date.now() + 5000

    watchState()
  }

  const onClick = e => {
    if (e) {
      e.preventDefault()
    }

    startSaving()

    const finished = () => actualState.current = 'saved'
    doSave()
      .then(finished, finished)
  }

  return {
    doSave,
    SaveButton: ({ disabled, ...rest }) => (
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
}

export default SaveButtonFactory