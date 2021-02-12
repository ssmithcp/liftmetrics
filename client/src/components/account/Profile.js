import { connect } from 'react-redux'
import _ from 'lodash'

import { logout } from '../../actions/user'

import BigButton from '../util/BigButton'
import TitledPage from '../container/TitledPage'
import { dayTime } from '../util/date'


const UpdatingOptions = ({ current, options }) => {

  return (
    <div>
      <select
        className='w-52'
        value={ current }
      >
        { options.map(o =>
          <option key={ o } value={ o }>
            { o }
          </option>
        )}
      </select>
    </div>
  )
}

const Profile = ({ profile, profileOptions, logout }) => {
  return <TitledPage title={ `Profile for ${ profile.firstName } ${ profile.lastName[0].toUpperCase() }` }>
    <div className='my-6 text-lg grid gap-2 grid-cols-profile'>
      <p>First name</p>
      <p>{ profile.firstName }</p>
      <p>Last name</p>
      <p>{ profile.lastName }</p>
      <p>Weight unit</p>
      <UpdatingOptions
        current={ profile.weightUnit }
        options={ profileOptions.weightUnits }
      />
      <p>Length unit</p>
      <UpdatingOptions
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

export default connect(mapStateToProps, { logout })(Profile)