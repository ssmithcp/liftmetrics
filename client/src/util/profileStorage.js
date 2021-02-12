const PROFILE_KEY = '__lm_profile'

export const setProfile = profile => {
  if (profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  } else {
    localStorage.removeItem(PROFILE_KEY)
  }
}

export const getProfile = () => {
  const profile = localStorage.getItem(PROFILE_KEY)
  if (profile) {
    const profileObj = JSON.parse(profile)
    return {
      ...profileObj,
      lastLogin: new Date(profileObj.lastLogin)
    }
  }
  return null
}