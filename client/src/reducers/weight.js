import _ from 'lodash'

export const ADD_WEIGHTS = 'ADD_WEIGHTS'
export const ADD_WEIGHT = 'ADD_WEIGHT'
export const DELETE_WEIGHT = 'DELETE_WEIGHT'
export const CLEAR_WEIGHTS = 'CLEAR_WEIGHTS'

function weight(state = [], action) {
  switch (action.type) {
    case ADD_WEIGHT:
      return _.uniqBy(state.concat([action.payload]), w => w.id)
    case ADD_WEIGHTS:
      return _.uniqBy(state.concat(action.payload), w => w.id)
    case DELETE_WEIGHT:
      return state.filter(w => w.id !== action.id)
    case CLEAR_WEIGHTS:
      return []
    default:
      return state
  }
}

export default weight