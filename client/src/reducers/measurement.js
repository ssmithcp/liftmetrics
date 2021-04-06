import _ from 'lodash'

import { RESET } from './shared'

export const ADD_MEASUREMENTS = 'ADD_MEASUREMENTS'
export const ADD_MEASUREMENT = 'ADD_MEASUREMENT'
export const DELETE_MEASUREMENT = 'DELETE_MEASUREMENT'
export const CLEAR_MEASUREMENTS = 'CLEAR_MEASUREMENTS'

function measurement(state = [], action) {
  switch (action.type) {
    case ADD_MEASUREMENT:
      return _.uniqBy([action.payload].concat(state), w => w.id)
    case ADD_MEASUREMENTS:
      return _.uniqBy(action.payload.concat(state), w => w.id)
    case DELETE_MEASUREMENT:
      return state.filter(w => w.id !== action.id)
    case RESET:
    case CLEAR_MEASUREMENTS:
      return []
    default:
      return state
  }
}

export default measurement