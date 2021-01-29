import { connect } from 'react-redux'

import { logout } from '../../actions/auth'

import TitledPage from '../container/TitledPage'

const Profile = ({ profile, logout }) => {
  const { firstName, lastName } = profile

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
  profile: state.profile,
  profileOptions: state.profile,
})

export default connect(mapStateToProps, { logout })(Profile)