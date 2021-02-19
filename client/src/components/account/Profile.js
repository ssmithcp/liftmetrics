import { useState } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { IconContext } from 'react-icons'
import { GoCheck } from 'react-icons/go'

import { update } from '../../actions/profile'
import { logout } from '../../actions/user'

import BigButton from '../util/BigButton'
import TitledPage from '../container/TitledPage'
import { dayTime } from '../util/date'

const UpdatingOptions = ({ current, options, doUpdate }) => {
  const [showSaved, setShowSaved] = useState(false)

  const savedNotification = () => {
    setShowSaved(true)
    // TODO handle case where we navigate away from profile before this fires
    setTimeout(() => setShowSaved(false), 5000)
  }

  return (
    <div className='flex'>
      <select
        className='w-40 md:w-52'
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

const Profile = ({ profile, profileOptions, update, logout }) => {
  return <TitledPage title={ `Profile for ${ profile.firstName } ${ profile.lastName[0].toUpperCase() }` }>
    <div className='my-6 text-lg grid gap-2 grid-cols-profile'>
      <p>First name</p>
      <p>{ profile.firstName }</p>
      <p>Last name</p>
      <p>{ profile.lastName }</p>
      <p>Weight unit</p>
      <UpdatingOptions
        doUpdate={ val => update({ weightUnit: val }) }
        current={ profile.weightUnit }
        options={ profileOptions.weightUnits }
      />
      <p>Length unit</p>
      <UpdatingOptions
        doUpdate={ val => update({ lengthUnit: val }) }
        current={ profile.lengthUnit }
        options={ profileOptions.lengthUnits }
      />
      <p>Last login</p>
      <p>{ dayTime(profile.lastLogin) }</p>
    </div>

    <BigButton onClick={ logout }>
      Logout!
    </BigButton>
  </TitledPage>
}


const mapStateToProps = state => ({
  profile: _.omit(
    _.pickBy(state.profile, (_, k) => !k.startsWith('available')),
    ['roles', 'user', 'avatar']
  ),
  profileOptions: _.mapKeys(
    _.pickBy(state.profile, (_, k) => k.startsWith('available')),
    (_, k) => {
      k = k.substring('available'.length)
      return k[0].toLowerCase() + k.substring(1)
    }
  )
})

export default connect(mapStateToProps, { update, logout })(Profile)