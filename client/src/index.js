import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import config from './util/config'

import App from './components/App'
import store from './store'

import './index.css'

const StrictMode = () => (
  config.isDev // only show strict mode warnings in devlopment
    ? React.StrictMode
    : React.Fragment
)

const Root = () => (
  <StrictMode>
    <Provider store={ store }>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
)

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
