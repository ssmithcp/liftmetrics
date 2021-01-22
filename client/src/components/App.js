import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from './navbar/NavBar'
import routes from './navbar'
import Alert from './util/Alert'
import Container from './util/Container'
import PrivateRoute from './util/PrivateRoute'

import Home from './landing/Home'
import About from './landing/About'

import Create from './account/Create'
import Login from './account/Login'
import Profile from './account/Profile'

import TrackDashboard from './track/Dashboard'

import AnalyzeDashboard from './analyze/Dashboard'

import NotFound from './util/NotFound'

const withContainer = Page => () => (
  <Container className='mt-28 md:mt-24'>
    <main>
      <Alert />
      <Page />
    </main>
  </Container>
)

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route path={ routes.home.path } exact component={ Home } />
      <Route path={ routes.about.path } exact render={ withContainer(About) } />

      <Route path={ routes.signUp.path } exact render={ withContainer(Create) } />
      <Route path={ routes.login.path } exact render={ withContainer(Login) } />
      <PrivateRoute path={ routes.profile.path } exact render={ withContainer(Profile) } />

      <PrivateRoute path={ routes.trackHome.path } exact render={ withContainer(TrackDashboard) } />

      <PrivateRoute path={ routes.analyzeHome.path } exact render={ withContainer(AnalyzeDashboard) } />

      <Route render={ withContainer(NotFound) } />
    </Switch>
  </Router>
)

export default App
