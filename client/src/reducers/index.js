import { combineReducers } from 'redux'

import alert from './alert'
import profile from './profile'
import weight from './weight'
import movement from './movement'
import exercise from './exercise'
import measurementSite from './measurementSite'
import measurement from './measurement'
import supplement from './supplement'
import consumedSupplement from './consumedSupplement'

export default combineReducers({
  alert,
  profile,
  weight,
  movement,
  exercise,
  measurementSite,
  measurement,
  supplement,
  consumedSupplement,
})