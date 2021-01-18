import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from './nav/NavBar'
import Container from './util/Container'

import Home from './Home'
import LoginPage from './login/LoginPage'

const withContainer = Page => (
  <Container>
    <Page />
  </Container>
)

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/' exact render={ () => withContainer(Home) } />
        <Route path='/login' exact render={ () => withContainer(LoginPage) } />
      </Switch>
    </Router>
  )
}

export default App
