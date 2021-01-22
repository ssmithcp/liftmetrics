import React from 'react'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => (
  <h2>Alerts: { JSON.stringify(alerts.map(a => a.msg)) }</h2>
)

const mapStateToProps = state => ({
  alerts: state.alert,
})

export default connect(mapStateToProps)(Alert)