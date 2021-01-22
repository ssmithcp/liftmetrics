export const PROFILE_UPDATED = 'PROFILE_UPDATED'

export const profile = newProfile => dispatch =>
  dispatch({
    type: PROFILE_UPDATED,
    profile: newProfile
  })

export const logout = () => profile(null)