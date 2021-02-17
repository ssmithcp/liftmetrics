import { RESET } from './shared'

export const ADD_SUPPLEMENTS = 'ADD_SUPPLEMENTS'
export const ADD_SUPPLEMENT = 'ADD_SUPPLEMENT'
export const DELETE_SUPPLEMENT = 'DELETE_SUPPLEMENT'
export const CLEAR_SUPPLEMENTS = 'CLEAR_SUPPLEMENTS'

function supplement(state = {}, action) {
  switch (action.type) {
    case ADD_SUPPLEMENT: {
      const copy = { ...state }
      copy[action.payload.id] = action.payload
      return copy
    }
    case ADD_SUPPLEMENTS: {
      const copy = { ...state }
      action.payload.forEach(a => copy[a.id] = a)
      return copy
    }
    case DELETE_SUPPLEMENT: {
      const copy = { ...state}
      delete copy[action.id]
      return copy
    }
    case RESET:
    case CLEAR_SUPPLEMENTS:
      return {}
    default:
      return state
  }
}

export default supplement