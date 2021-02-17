import { RESET } from './shared'

export const ADD_MEASUREMENT_SITES = 'ADD_MEASUREMENT_SITES'
export const ADD_MEASUREMENT_SITE = 'ADD_MEASUREMENT_SITE'
export const DELETE_MEASUREMENT_SITE = 'DELETE_MEASUREMENT_SITE'
export const CLEAR_MEASUREMENT_SITES = 'CLEAR_MEASUREMENT_SITES'

function measurementSite(state = {}, action) {
  switch (action.type) {
    case ADD_MEASUREMENT_SITE: {
      const copy = { ...state }
      copy[action.payload.id] = action.payload
      return copy
    }
    case ADD_MEASUREMENT_SITES: {
      const copy = { ...state }
      action.payload.forEach(a => copy[a.id] = a)
      return copy
    }
    case DELETE_MEASUREMENT_SITE: {
      const copy = { ...state}
      delete copy[action.id]
      return copy
    }
    case RESET:
    case CLEAR_MEASUREMENT_SITES:
      return {}
    default:
      return state
  }
}

export default measurementSite