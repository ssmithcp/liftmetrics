import { getProfile } from '../util/profileStorage'

export const PROFILE_UPDATED = 'PROFILE_UPDATED'

function profile(state = getProfile(), action) {
  switch (action.type) {
    case PROFILE_UPDATED:
      if (action.payload === null) {
        return null
      }

      return {
        ...action.payload,
        lastLogin: new Date(action.payload.lastLogin),
      }
    default:
      return state
  }
}

export default profile