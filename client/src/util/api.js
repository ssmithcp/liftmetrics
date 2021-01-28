import axios from 'axios'

import config from './config'

import store from '../store'
import { profileUpdated } from '../actions/profile'

const api = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      profileUpdated(null)(store.dispatch)
    }
    return Promise.reject(err)
  }
)

export default api