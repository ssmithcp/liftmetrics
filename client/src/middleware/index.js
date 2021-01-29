import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import config from '../util/config';

const middleware = [
  thunk
]

let fun = applyMiddleware(...middleware)

if (config.isDev) {
  fun = composeWithDevTools(fun)
}

export default fun