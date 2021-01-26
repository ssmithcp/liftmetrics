import api from '../util/api'

import { getProfile, profileUpdated } from './profile'

import { alertOnAPIError } from './alert'

export const register = formData => async dispatch => {
  try {
    await api.post('/auth/register', formData)

    dispatch(getProfile())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(alert(error.msg, 'ERROR')))
    }
  }
}

// export const register = formData => async dispatch => {
//   alertOnAPIError(async () => {
//     await api.post('/auth/register', formData)

//     dispatch(getProfile())
//   }, dispatch)
// }

export const login = formData => async dispatch => {
  alertOnAPIError(async () => {
    await api.post('/auth/login', formData)

    dispatch(getProfile())
  }, dispatch)
}

export const logout = () => async dispatch => {
  alertOnAPIError(async () => {
    await api.get('/auth/logout')

    dispatch(profileUpdated(null))
  }, dispatch)
}