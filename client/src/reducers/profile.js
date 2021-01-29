import { getProfile } from '../util/profileStorage'

export const PROFILE_UPDATED = 'PROFILE_UPDATED'

function profile(state = getProfile(), action) {
  switch (action.type) {
    case PROFILE_UPDATED:
      return action.profile
    default:
      return state
  }
}

export default profile