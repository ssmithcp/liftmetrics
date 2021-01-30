import { connect } from 'react-redux'
import _ from 'lodash'

import { logout } from '../../actions/auth'

import BigButton from '../util/BigButton'
import TitledPage from '../container/TitledPage'

const Profile = ({ profile, logout }) => {
  return (
    <TitledPage title={ `Profile for ${ profile.firstName } ${ profile.lastName[0].toUpperCase() }` }>
      <div className='my-6 text-lg grid grid-cols-profile'>
        <p>First name</p>
        <p>{ profile.firstName }</p>
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