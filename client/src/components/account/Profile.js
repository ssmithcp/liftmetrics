import React from 'react'
import { connect } from 'react-redux'

import api from '../../util/api'

const Profile = ({ profile }) => {

  // (async () => {
  //   console.log(await api.get('/profiles/me'))
  // })()

  return (
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
  )
}

const mapStateToProps = state => ({
  profile: state.profile,
})

export default connect(mapStateToProps)(Profile)