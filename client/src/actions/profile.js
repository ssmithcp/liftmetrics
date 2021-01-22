import api from '../util/api'

import { alert, ERROR } from './alert'

export const PROFILE_UPDATED = 'PROFILE_UPDATED'

export const register = formData => async dispatch => {
  try {
    const res = await api.post('/users', formData)

    console.log('got response', res)

    dispatch({
      type: PROFILE_UPDATED,
      profile: res.data,
    })
  } catch (err) {
    console.log('errors are:', err)
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach(error => dispatch(alert(error.msg, ERROR)))
    }
  }
}