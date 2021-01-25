import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import NavBar from './navbar/NavBar'
import routes from './navbar'
import Alert from './util/Alert'
import Container from './util/Container'
import PrivateRoute from './util/PrivateRoute'

import Index from './landing/Index'
import Home from './landing/Home'
import About from './landing/About'

import Create from './account/Create'
import Login from './account/Login'
import Profile from './account/Profile'

import TrackDashboard from './track/Dashboard'

import AnalyzeDashboard from './analyze/Dashboard'

import NotFound from './util/NotFound'

import { logout } from '../actions/auth'
import { profileUpdated } from '../actions/profile'
import { getProfile } from '../util/profileStorage'

const withContainer = Page => () => (
  <Container className='mt-28 md:mt-24'>
    <main>
      <Alert />
      <Page />
    </main>
  </Container>
)

const App = ({ profileUpdated, logout }) => {
  React.useEffect(() => {
    profileUpdated(getProfile())

    if (window) {
      // log user out from all tabs if they log out in one tab
      window.addEventListener('storage', () => {
        if (!getProfile()) {
          logout()
        }
      })
    }
  })

  return (
    <>
      <NavBar />
      <Switch>
        <Route path={ routes.index.path } exact component={ Index } />
        <Route path={ routes.about.path } exact render={ withContainer(About) } />

        <Route path={ routes.signUp.path } exact render={ withContainer(Create) } />
        <Route path={ routes.login.path } exact render={ withContainer(Login) } />

        <PrivateRoute path={ routes.home.path } exact render={ withContainer(Home) } />
        <PrivateRoute path={ routes.profile.path } exact render={ withContainer(Profile) } />

        <PrivateRoute path={ routes.trackHome.path } exact render={ withContainer(TrackDashboard) } />

        <PrivateRoute path={ routes.analyzeHome.path } exact render={ withContainer(AnalyzeDashboard) } />

        <Route render={ withContainer(NotFound) } />
      </Switch>
    </>
  )
}

export default connect(null, { profileUpdated, logout })(App)
