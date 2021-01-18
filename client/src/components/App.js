import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LoginPage from './login/LoginPage'
import Nav from './Nav'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path='/' exact component={ LoginPage } />
      </Switch>
    </Router>
  )
}

export default App
