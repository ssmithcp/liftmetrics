import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from './nav/NavBar'
import Alert from './util/Alert'
import Container from './util/Container'

import Home from './Home'
import About from './About'

import Create from './account/Create'
import Login from './account/Login'

import NotFound from './util/NotFound'

const withContainer = Page => () => (
  <Container className='mt-28 md:mt-24'>
    <main>
      {/* <Alert /> */}
      <Page />
    </main>
  </Container>
)

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route path='/' exact component={ Home } />
      <Route path='/about' exact render={ withContainer(About) } />

      <Route path='/account/create' exact render={ withContainer(Create) } />
      <Route path='/account/login' exact render={ withContainer(Login) } />

      <Route render={ withContainer(NotFound) } />
    </Switch>
  </Router>
)

export default App
