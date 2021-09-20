import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import store from './store'

import App from './components/App'

import './index.css'

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
