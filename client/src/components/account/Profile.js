import { connect } from 'react-redux'

import { logout } from '../../actions/auth'

import BigButton from '../util/BigButton'
import TitledPage from '../container/TitledPage'

const Profile = ({ profile, logout }) => {
  console.log(profile)
  return (
    <TitledPage title={ `Profile for ${ profile.firstName } ${ profile.lastName[0].toUpperCase() }` }>
      <div>

      </div>

      <BigButton onClick={ logout }>
        Logout!
      </BigButton>
    </TitledPage>
  )
}

const mapStateToProps = state => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { logout })(Profile)