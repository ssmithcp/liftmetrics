import { PROFILE_UPDATED } from '../actions/profile'
import { getProfile } from '../util/profileStorage'

function profile(state = getProfile(), action) {
  switch (action.type) {
    case PROFILE_UPDATED:
      return action.profile
    default:
      return state
  }
}

export default profile