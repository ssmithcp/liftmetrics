import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import config from './util/config'
import store from './store'

import App from './components/App'

import './index.css'

const Root = () => (
  <React.StrictMode>
    <Provider store={ store }>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
)

// only show strict mode warnings in devlopment
const SrictInDev = ({ children }) => (
  config.isDev
    ? (
      <React.StrictMode>
        { children }
      </React.StrictMode>
    )
    : (
      <>
        { children }
      </>
    )
)

ReactDOM.render(
  <SrictInDev>
    <Root />
  </SrictInDev>,
  document.getElementById('root')
)
