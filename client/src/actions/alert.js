import { v4 as uuidv4 } from 'uuid'

export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'
export const CLEAR_ALERTS = 'CLEAR_ALERTS'

export const INFO = 'INFO'
export const WARNING = 'WARNING'
export const ERROR = 'ERROR'

export const alert = (message, type = ERROR, timeout = 5000) => dispatch => {
  const id = uuidv4()

  dispatch({
    type: SET_ALERT,
    payload: {
      id,
      type,
      message,
      date: Date.now(),
    }
  })

  setTimeout(() => removeAlert(id)(dispatch), timeout);
}

export const removeAlert = id => dispatch => (
  dispatch({
    type: REMOVE_ALERT,
    id
  })
)

export const clearAlerts = () => dispatch => {
  dispatch({
    type: CLEAR_ALERTS,
  })
}

export const alertOnAPIError = (fun, dispatch) => {
  return Promise.resolve(fun())
    .catch(err => {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors

        errors.forEach(error => dispatch(alert(error.msg, ERROR)))
      } else if (err.response && err.response.status === 401) {
        dispatch(alert('Your session expired, please login again', WARNING))
      } else if (err.message) {
        dispatch(alert(err.message, ERROR))
      } else {
        dispatch(alert(err, ERROR))
      }

      throw err // allow subsequent catch functions to run
    })
}