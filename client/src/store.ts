import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducer from './reducers';

const middleware = composeWithDevTools(applyMiddleware(
  thunk,
));

const store = createStore(reducer, middleware);

export default store;
