import api from '../util/api'

import { profileUpdated } from './profile'

import { alertAndThrow } from './alert'
import { RESET } from '../reducers/shared'

export const register = formData => async dispatch => {
  try {
    await api.post('/user/register', formData)

    const res = await api.get('/profile/me')
    profileUpdated(res.data)(dispatch)
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const login = formData => async dispatch => {
  try {
    await api.post('/user/login', formData)

    const res = await api.get('/profile/me')
    profileUpdated(res.data)(dispatch)
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const logout = () => async dispatch => {
  try {
    await api.get('/user/logout')
    profileUpdated(null)(dispatch)
    dispatch({
      type: RESET,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}