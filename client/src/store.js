import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import reducer from './reducers'

const middleware = composeWithDevTools(applyMiddleware(
  thunk,
))

export default createStore(reducer, middleware)