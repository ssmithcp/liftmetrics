import { useState, useRef, useEffect } from 'react'

import manage from '../../util/timer'

import Button from './Button'
import Spinner from './Spinner'

// TODO don't show 'Saved!' when xhr comes back with a validation error

const SaveButton = ({ doSave, disabled, className, ...rest }) => {
  const [saveEnabled, setSaveEnabled] = useState(true)
  const [displayedState, setDisplayedState] = useState('save')

  const xhrCompleted = useRef(false)
  const showSavingMin = useRef(-1)
  const showTimeoutAt = useRef(-1)
  const [register, unregister, clearAll] = manage(useRef([]))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clearAll, [])

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
      register(setTimeout(() => setDisplayedState('save'), 5000))
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
      () => maybeUpdateDisplayedState(() => {
        clearInterval(id)
        unregister(id)
      }),
      300
    )
    register(id)
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
      className='px-10'
      disabled={ disabled || !saveEnabled }
      onClick={ onClick }
    >
      <div className='relative flex justify-center'>
        { displayedState === 'save' && <p>Save</p> }
        { displayedState === 'saving' && <p>Saving</p> }
        { displayedState === 'saved' && <p>Saved!</p> }
        { displayedState === 'timedout' && <p>Save timed out, try again later!</p> }
        <Spinner
          className={ `ml-1 ${ displayedState !== 'saving' ? 'hidden' : '' }` }
        />
      </div>
    </Button>
  )
}

export default SaveButton