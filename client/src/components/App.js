import { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import { addWeeks, addDays } from 'date-fns'

import ConfirmationDialog from './util/ConfirmationDialog'

import NavBar from './navigation/NavBar'
import routes from './navigation'
import PageWidthContainer from './container/PageWidthContainer'
import PrivateRoute from './navigation/PrivateRoute'

import Index from './landing/Index'
import Home from './landing/Home'
import About from './landing/About'

import SignUp from './account/SignUp'
import Login from './account/Login'
import Profile from './account/Profile'

import TrackDashboard from './track/Dashboard'
import Weight from './track/weight/Index'
import EditWeight from './track/weight/EditWeight'

import AnalyzeDashboard from './analyze/Dashboard'

import NotFound from './landing/NotFound'

import { logout } from '../actions/user'
import { getProfile } from '../util/profileStorage'
import { getWeightsFrom } from '../actions/weight'

const withContainer = Page => props => (
  <PageWidthContainer className='mt-24'>
    <main>
      <Page { ...props } />
    </main>
  </PageWidthContainer>
)

const App = ({ logout, getWeightsFrom }) => {
  useEffect(() => {
    if (window) {
      const doLogout = () => {
        if (!getProfile()) {
          logout()
        }
      }

      // log user out from all tabs if they log out in one tab
      window.addEventListener('storage', doLogout)

      return () => {
        window.removeEventListener('storage', doLogout)
      }
    }
  }, [logout])

  const isLoggedIn = useSelector(state => state.profile !== null)

  useEffect(() => {
    if (isLoggedIn) {
      getWeightsFrom(addDays(addWeeks(Date.now(), -4), -1))
    }
  }, [getWeightsFrom, isLoggedIn])

  return (
    <div className='select-none'>
      <ConfirmationDialog />
      <NavBar />
      <Switch>
        <Route path={ routes.index.path } exact component={ Index } />
        <Route path={ routes.about.path } exact render={ withContainer(About) } />

        <Route path={ routes.signUp.path } exact render={ withContainer(SignUp) } />
        <Route path={ routes.login.path } exact render={ withContainer(Login) } />

        <PrivateRoute path={ routes.home.path } exact render={ withContainer(Home) } />
        <PrivateRoute path={ routes.profile.path } exact render={ withContainer(Profile) } />

        <PrivateRoute path={ routes.trackHome.path } exact render={ withContainer(TrackDashboard) } />
        <PrivateRoute path={ routes.trackWeight.path } exact render={ withContainer(Weight) } />
        <PrivateRoute path={ routes.trackEditWeight.path } render={ withContainer(EditWeight) } />

        <PrivateRoute path={ routes.analyzeHome.path } exact render={ withContainer(AnalyzeDashboard) } />

        <Route component={ NotFound } />
      </Switch>
    </div>
  )
}

export default connect(null, { logout, getWeightsFrom })(App)
