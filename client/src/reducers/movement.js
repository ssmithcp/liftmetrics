import { RESET } from './shared'

export const ADD_MOVEMENTS = 'ADD_MOVEMENTS'
export const ADD_MOVEMENT = 'ADD_MOVEMENT'
export const DELETE_MOVEMENT = 'DELETE_MOVEMENT'
export const CLEAR_MOVEMENTS = 'CLEAR_MOVEMENTS'

function movement(state = {}, action) {
  switch (action.type) {
    case ADD_MOVEMENT: {
      const copy = { ...state }
      copy[action.payload.id] = action.payload
      return copy
    }
    case ADD_MOVEMENTS: {
      const copy = { ...state }
      action.payload.forEach(a => copy[a.id] = a)
      return copy
    }
    case DELETE_MOVEMENT: {
      const copy = { ...state}
      delete copy[action.id]
      return copy
    }
    case RESET:
    case CLEAR_MOVEMENTS:
      return {}
    default:
      return state
  }
}

export default movement