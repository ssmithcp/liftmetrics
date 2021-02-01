import { connect } from 'react-redux'
import _ from 'lodash'
import { format } from 'date-fns'

import { logout } from '../../actions/auth'

import BigButton from '../util/BigButton'
import TitledPage from '../container/TitledPage'

const formatKey = key => {
  const parts = key.split(/(?=[A-Z])/).map(p => p.toLowerCase())

  const first = parts[0]
  parts[0] = first[0].toUpperCase() + first.substring(1)

  return parts.join(' ')
}

const Entry = ({ k, value, options }) => (
  <>
    <p>{ formatKey(k) }</p>
    <p>{ value }</p>
  </>
)

const Profile = ({ profile, profileOptions, logout }) => {
  return (
    <TitledPage title={ `Profile for ${ profile.firstName } ${ profile.lastName[0].toUpperCase() }` }>
      <div className='my-6 text-lg grid gap-2 grid-cols-profile'>
        { [ 'firstName', 'lastName', 'weightUnit', 'lengthUnit' ].map(key =>
            <Entry k={ key } value={ profile[key] } options={ profileOptions[key] } />
        )}
        <p>Last login</p>
        <p>{ format(new Date(profile.lastLogin), 'PPpp') }</p>
        <p></p>
      </div>

      <BigButton onClick={ logout }>
        Logout!
      </BigButton>
    </TitledPage>
  )
}

const mapStateToProps = state => ({
  profile: _.omit(
    _.pickBy(state.profile, (_, k) => !k.startsWith('available')),
    ['roles', 'user', 'avatar']
  ),
  profileOptions: _.mapKeys(
    _.pickBy(state.profile, (_, k) => k.startsWith('available')),
    (_, k) => {
      console.log(k)
      k = k.substring('available'.length)
      return k[0].toLowerCase() + k.substring(1)
    }
  )
})

export default connect(mapStateToProps, { logout })(Profile)