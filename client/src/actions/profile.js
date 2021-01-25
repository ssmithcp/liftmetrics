export const PROFILE_UPDATED = 'PROFILE_UPDATED'

export const profileUpdated = profile => dispatch => (
  dispatch({
    type: PROFILE_UPDATED,
    profile,
  })
)