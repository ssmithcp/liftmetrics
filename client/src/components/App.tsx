import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

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
import Workout from './track/workout/Index'
import EditExercise from './track/workout/EditExercise'
import Measurement from './track/measurement/Index'
import EditMeasurement from './track/measurement/EditMeasurement'
import Supplement from './track/supplement/Index'
import EditConsumedSupplement from './track/supplement/EditConsumedSupplement'
import EditMovement from './track/workout/EditMovement'

import AnalyzeDashboard from './analyze/Dashboard'

import NotFound from './landing/NotFound'

import { logout } from '../actions/user'
import { getProfile } from '../util/profileStorage'

const withContainer = (Page: React.FC) => (props: any) => (
  <PageWidthContainer className='mt-20 md:mt-24'>
    <main>
      <Page {...props} />
    </main>
  </PageWidthContainer>
)

const App = ({ logout }: {logout: any}) => {
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

        <PrivateRoute path={ routes.trackExercise.path } exact render={ withContainer(Workout) } />
        <PrivateRoute path={ routes.trackEditExercise.path } render={ withContainer(EditExercise) } />
        <PrivateRoute path={ routes.trackEditMovement.path } render={ withContainer(EditMovement) } />

        <PrivateRoute path={ routes.trackMeasurement.path } exact render={ withContainer(Measurement) } />
        <PrivateRoute path={ routes.trackEditMeasurement.path } render={ withContainer(EditMeasurement) } />

        <PrivateRoute path={ routes.trackSupplement.path } exact render={ withContainer(Supplement) } />
        <PrivateRoute path={ routes.trackEditConsumedSupplement.path } render={ withContainer(EditConsumedSupplement) } />

        <PrivateRoute path={ routes.analyzeHome.path } exact render={ withContainer(AnalyzeDashboard) } />

        <Route component={ NotFound } />
      </Switch>
    </div>
  )
}

export default connect(null, { logout })(App)
