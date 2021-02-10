import _ from 'lodash'

import { RESET } from './shared'

export const ADD_MOVEMENTS = 'ADD_MOVEMENTS'
export const ADD_MOVEMENT = 'ADD_MOVEMENT'
export const DELETE_MOVEMENT = 'DELETE_MOVEMENT'
export const CLEAR_MOVEMENTS = 'CLEAR_MOVEMENTS'

function movement(state = [], action) {
  switch (action.type) {
    case ADD_MOVEMENT:
      return _.uniqBy(state.concat([action.payload]), w => w.id)
    case ADD_MOVEMENTS:
      return _.uniqBy(state.concat(action.payload), w => w.id)
    case DELETE_MOVEMENT:
      return state.filter(w => w.id !== action.id)
    case RESET:
    case CLEAR_MOVEMENTS:
      return []
    default:
      return state
  }
}

export default movement