import { connect } from 'react-redux'
import _ from 'lodash'

import { logout } from '../../actions/auth'

import TitledPage from '../container/TitledPage'

const Profile = ({ profile, logout }) => {
  return (
    <TitledPage title={ `Profile for ${ profile.firstName } ${ profile.lastName[0].toUpperCase() }` }>
      <table>
        <tbody>
          { Object.keys(profile).map(key =>
              <tr key={ key }>
                <td>{ key }</td>
                <td>{ Array.isArray(profile[key])
                        ? JSON.stringify(profile[key])
                        : profile[key]
                    }</td>
              </tr>
          )}
        </tbody>
      </table>

      <button
        onClick={ logout }
        className='border border-black'
      >
        Logout!
      </button>
    </TitledPage>
  )
}

const mapStateToProps = state => ({
  profile: _.pickBy(state.profile, (_, k) => !k.startsWith('available')),
  profileOptions: state.profile,
})

export default connect(mapStateToProps, { logout })(Profile)