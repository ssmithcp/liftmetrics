import React from 'react'
import { connect } from 'react-redux'

const Profile = ({ profile }) => {
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