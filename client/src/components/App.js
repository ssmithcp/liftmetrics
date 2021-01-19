import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from './nav/NavBar'
import Container from './util/Container'

import Home from './Home'
import Login from './login/Login'
import SignUp from './login/SignUp'
import NotFound from './util/NotFound'

const withContainer = Page => () => (
  <Container>
    <Page />
  </Container>
)

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/' exact render={ withContainer(Home) } />
        <Route path='/signup' exact render={ withContainer(SignUp) } />
        <Route path='/login' exact render={ withContainer(Login) } />
        <Route render={ withContainer(NotFound) } />
      </Switch>
    </Router>
  )
}

export default App
