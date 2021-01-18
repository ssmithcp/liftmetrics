import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Nav from './nav/Nav'
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
      <Nav />
      <Switch>
        <Route path='/' exact render={ () => withContainer(Home) } />
        <Route path='/login' exact render={ () => withContainer(LoginPage) } />
      </Switch>
    </Router>
  )
}

export default App
