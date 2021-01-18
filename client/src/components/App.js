import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './login/login';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={ LoginPage } />
      </Switch>
    </Router>
  )
}

export default App;
