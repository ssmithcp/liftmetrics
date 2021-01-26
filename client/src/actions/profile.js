import api from '../util/api'

import { setProfile } from '../util/profileStorage'

import { alertOnAPIError } from './alert'

export const PROFILE_UPDATED = 'PROFILE_UPDATED'

export const profileUpdated = profile => dispatch => {
  setProfile(profile)

  dispatch({
    type: PROFILE_UPDATED,
    profile,
  })
}

export const getProfile = () => dispatch => (
  alertOnAPIError(async () => {
    const res = await api.get('/profile/me')
    profileUpdated(res.data)(dispatch)
  }, dispatch)
)