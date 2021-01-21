import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import NavBar from './nav/NavBar'
import Container from './util/Container'

import Home from './Home'
import Login from './login/Login'
import SignUp from './login/SignUp'
import About from './About'
import NotFound from './util/NotFound'

const withContainer = Page => () => (
  <Container className='mt-28 md:mt-20'>
    <main>
      <Page />
    </main>
  </Container>
)

const App = () => (
  <Router>
    <NavBar />
    <Switch>
      <Route path='/' exact component={ Home } />
      <Route path='/signup' exact render={ withContainer(SignUp) } />
      <Route path='/login' exact render={ withContainer(Login) } />
      <Route path='/about' exact render={ withContainer(About) } />
      <Route render={ withContainer(NotFound) } />
    </Switch>
  </Router>
)

export default App
