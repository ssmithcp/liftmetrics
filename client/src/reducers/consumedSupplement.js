import _ from 'lodash'

import { RESET } from './shared'

export const ADD_CONSUMED_SUPPLEMENTS = 'ADD_CONSUMED_SUPPLEMENTS'
export const ADD_CONSUMED_SUPPLEMENT = 'ADD_CONSUMED_SUPPLEMENT'
export const DELETE_CONSUMED_SUPPLEMENT = 'DELETE_CONSUMED_SUPPLEMENT'
export const CLEAR_CONSUMED_SUPPLEMENTS = 'CLEAR_CONSUMED_SUPPLEMENTS'

function consumedSupplement(state = [], action) {
  switch (action.type) {
    case ADD_CONSUMED_SUPPLEMENT:
      return _.uniqBy(state.concat([action.payload]), w => w.id)
    case ADD_CONSUMED_SUPPLEMENTS:
      return _.uniqBy(state.concat(action.payload), w => w.id)
    case DELETE_CONSUMED_SUPPLEMENT:
      return state.filter(w => w.id !== action.id)
    case RESET:
    case CLEAR_CONSUMED_SUPPLEMENTS:
      return []
    default:
      return state
  }
}

export default consumedSupplement