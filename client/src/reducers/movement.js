import { RESET } from './shared'

export const ADD_MOVEMENTS = 'ADD_MOVEMENTS'
export const ADD_MOVEMENT = 'ADD_MOVEMENT'
export const DELETE_MOVEMENT = 'DELETE_MOVEMENT'
export const CLEAR_MOVEMENTS = 'CLEAR_MOVEMENTS'

const formatNames = movement => {
  const copy = { ...movement }
  copy.name = copy.name.toLowerCase()

  if (copy.name.startsWith('ez')) {
    copy.name = 'EZ' + copy.name.substring(2)
  } else if (copy.name.startsWith('db')) {
    copy.name = 'DB' + copy.name.substring(2)
  } else if (copy.name.startsWith('tng')) {
    copy.name = 'TNG' + copy.name.substring(3)
  } else {
    copy.name = copy.name[0].toUpperCase() + copy.name.substring(1)
  }

  if (copy.modifiers.length > 0) {
    copy.name += ' w/ ' + copy.modifiers.join(', ')
  }

  return copy
}

function movement(state = {}, action) {
  switch (action.type) {
    case ADD_MOVEMENT: {
      const copy = { ...state }
      copy[action.payload.id] = formatNames(action.payload)
      return copy
    }
    case ADD_MOVEMENTS: {
      const copy = { ...state }
      action.payload.forEach(a => copy[a.id] = formatNames(a))
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