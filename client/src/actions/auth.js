import api from '../util/api'

import { alertOnAPIError } from './alert'

export const LOGGED_IN = 'LOGGED_IN'
export const LOGGED_OUT = 'LOGGED_OUT'

export const register = formData => async dispatch => {
  alertOnAPIError(async () => {
    await api.post('/users', formData)
    dispatch({
      type: LOGGED_IN,
    })
  }, dispatch)
}

export const login = formData => async dispatch => {
  alertOnAPIError(async () => {
    await api.post('/login', formData)
    dispatch({
      type: LOGGED_IN,
    })
  }, dispatch)
}

export const logout = () => async dispatch => {
  alertOnAPIError(async () => {
    await api.get('/logout')
    dispatch({
      type: LOGGED_OUT,
    })
  }, dispatch)
}