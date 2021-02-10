import { combineReducers } from 'redux'

import alert from './alert'
import profile from './profile'
import weight from './weight'
import movement from './movement'
import exercise from './exercise'

export default combineReducers({
  alert,
  profile,
  weight,
  movement,
  exercise,
})