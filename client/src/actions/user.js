import api from '../util/api'

import { profileUpdated } from './profile'

import { alertAndThrow } from './alert'
import { RESET } from '../reducers/shared'

export const register = formData => async dispatch => {
  try {
    await api.post('/users/register', formData)

    const res = await api.get('/profiles/me')
    profileUpdated(res.data)(dispatch)
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const login = formData => async dispatch => {
  try {
    await api.post('/users/login', formData)

    const res = await api.get('/profiles/me')
    profileUpdated(res.data)(dispatch)
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const logout = () => async dispatch => {
  try {
    await api.get('/users/logout')
    profileUpdated(null)(dispatch)
    dispatch({
      type: RESET,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}