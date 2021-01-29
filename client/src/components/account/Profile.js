import { connect } from 'react-redux'

import { logout } from '../../actions/auth'

import TitledPage from '../util/TitledPage'

const Profile = ({ profile, logout }) => {
  console.log(profile)

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

const withMatchingKeys = (state, keyFilter) =>
  Object.keys(state)
    .filter(keyFilter)
    .reduce((obj, key) => {
      obj[key] = state[key]
      return obj
    }, {})

const mapStateToProps = state => ({
  profile: withMatchingKeys(state.profile, k => !k.startsWith('available')),
  profileOptions: withMatchingKeys(state.profile, k => k.startsWith('available')),
})

export default connect(mapStateToProps, { logout })(Profile)