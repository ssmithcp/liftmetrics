import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './components/App'
import store from './store'

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

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
