import api from '../util/api'

import { profileUpdated } from './profile'

import { alertOnAPIError } from './alert'

export const register = formData => dispatch => (
  alertOnAPIError(async () => {
    await api.post('/user/register', formData)

    const res = await api.get('/profile/me')
    profileUpdated(res.data)(dispatch)
  }, dispatch)
)

export const login = formData => dispatch => (
  alertOnAPIError(async () => {
    await api.post('/user/login', formData)

    const res = await api.get('/profile/me')
    profileUpdated(res.data)(dispatch)
  }, dispatch)
)

export const logout = () => dispatch => (
  alertOnAPIError(async () => {
    await api.get('/user/logout')

    profileUpdated(null)(dispatch)
  }, dispatch)
)