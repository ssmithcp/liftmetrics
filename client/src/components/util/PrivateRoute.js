import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import routes from '../navbar'

const PrivateRoute = ({ isLoggedIn, ...rest }) => {
  if (!isLoggedIn) {
    return <Redirect to={ routes.login.path } />
  }

  return (
    <Route { ...rest } />
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.profile !== null,
})

export default connect(mapStateToProps)(PrivateRoute)