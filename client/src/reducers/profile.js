import { PROFILE_UPDATED } from '../actions/profile'

function profile(state = null, action) {
  switch (action.type) {
    case PROFILE_UPDATED:
      return action.profile
    default:
      return state
  }
}

export default profile