import React from 'react'
import { connect } from 'react-redux'

const Profile = ({ profile }) => (
  <table>
    { Object.keys(profile).map( key =>
        <tr>
          <td>{ key }</td>
          <td>{ JSON.stringify(profile[key]) }</td>
        </tr>
    )}
  </table>
)

const mapStateToProps = state => ({
  profile: state.profile,
})

export default connect(mapStateToProps)(Profile)