import _ from 'lodash'

import { RESET } from './shared'

export const ADD_EXERCISES = 'ADD_EXERCISES'
export const ADD_EXERCISE = 'ADD_EXERCISE'
export const DELETE_EXERCISE = 'DELETE_EXERCISE'
export const CLEAR_EXERCISES = 'CLEAR_EXERCISES'

function exercise(state = [], action) {
  switch (action.type) {
    case ADD_EXERCISE:
      return _.uniqBy(state.concat([action.payload]), w => w.id)
    case ADD_EXERCISES:
      return _.uniqBy(state.concat(action.payload), w => w.id)
    case DELETE_EXERCISE:
      return state.filter(w => w.id !== action.id)
    case RESET:
    case CLEAR_EXERCISES:
      return []
    default:
      return state
  }
}

export default exercise