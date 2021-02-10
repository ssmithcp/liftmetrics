import axios from 'axios'

import config from './config'

import store from '../store'
import { profileUpdated } from '../actions/profile'
import { RESET } from '../reducers/shared'

const api = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
})

const maybeWrapDate = d => {
  if (d.created) {
    return {
      ...d,
      created: new Date(d.created)
    }
  }

  return d
}

api.interceptors.response.use(
  res => {
    if (res.data) {
      if (res.data.data) {
        res.data.data = res.data.data.map(maybeWrapDate)
      } else if (res.data.created) {
        res.data = maybeWrapDate(res.data)
      }
    }

    return res
  },
  err => {
    if (err.response.status === 401) {
      profileUpdated(null)(store.dispatch)
      store.dispatch({
        type: RESET,
      })
    }
    return Promise.reject(err)
  }
)

export default api