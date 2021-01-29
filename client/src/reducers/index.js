import { combineReducers } from 'redux'

import alert from './alert'
import profile from './profile'
import weight from './weight'

export default combineReducers({
  alert,
  profile,
  weight,
})