import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../../actions/auth'

const Profile = ({ profile, logout }) => {
  return (
    <>
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
    </>
  )
}

const mapStateToProps = state => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { logout })(Profile)