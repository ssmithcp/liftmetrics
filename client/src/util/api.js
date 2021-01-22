import axios from 'axios'
import config from './config'

const api = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
)

export default api