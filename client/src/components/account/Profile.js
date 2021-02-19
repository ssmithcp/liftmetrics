import { useState, useRef, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { IconContext } from 'react-icons'
import { GoCheck } from 'react-icons/go'

import manage from '../../util/timer'
import { update } from '../../actions/profile'
import { logout } from '../../actions/user'

import BigButton from '../util/BigButton'
import TitledPage from '../container/TitledPage'
import ResponsiveDate from '../track/ResponsiveDate'

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const UpdatingOptions = ({ current, options, doUpdate }) => {
  const [showSaved, setShowSaved] = useState(false)
  const [register, unregister, clearAll] = manage(useRef([]))

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(clearAll, [])

  const savedNotification = () => {
    setShowSaved(true)
    // TODO handle case where we navigate away from profile before this fires
    const id = setTimeout(() => {
      setShowSaved(false)
      unregister(id)
    }, 5000)
    register(id)
  }

  return (
    <div className='flex'>
      <select
        className='w-16 md:w-52'
        value={ current }
        onChange={ e => doUpdate(e.target.value).then(savedNotification) }
      >
        { options.map(o =>
          <option key={ o } value={ o }>
            { o }
          </option>
        )}
      </select>
      { showSaved && (
        <div className='flex'>
          <IconContext.Provider value={{ className: 'text-green-700 ml-3 mr-1 w-6 h-6' }}>
            <GoCheck />
          </IconContext.Provider>
          <p>Saved!</p>
        </div>
      )}
    </div>
  )
}

const Profile = ({ update, logout }) => {
  const profile = useSelector(s => s.profile)

  const { firstName, lastName } = profile

  return <TitledPage title={ `Profile for ${ firstName } ${ lastName[0].toUpperCase() }` }>
    <div className='my-6 text-lg grid gap-2 grid-cols-profile'>
      <p>First name</p>
      <p>{ firstName}</p>
      <p>Last name</p>
      <p>{ lastName }</p>
      <p>Weight unit</p>
      <UpdatingOptions
        doUpdate={ val => update({ weightUnit: val }) }
        current={ profile.weightUnit }
        options={ profile.availableWeightUnits }
      />
      <p>Length unit</p>
      <UpdatingOptions
        doUpdate={ val => update({ lengthUnit: val }) }
        current={ profile.lengthUnit }
        options={ profile.availableLengthUnits }
      />
      <p>Week start day</p>
      <UpdatingOptions
        doUpdate={ val => update({ weekStartDay: days.indexOf(val) }) }
        current={ days[profile.weekStartDay || 1] }
        options={ days }
      />
      <p>Last login</p>
      <ResponsiveDate date={ profile.lastLogin } />
    </div>

    <BigButton onClick={ logout }>
      Logout!
    </BigButton>
  </TitledPage>
}

export default connect(null, { update, logout })(Profile)