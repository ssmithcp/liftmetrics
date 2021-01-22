import { v4 as uuidv4 } from 'uuid'

export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'
export const CLEAR_ALERTS = 'CLEAR_ALERTS'

export const WARNING = 'WARNING'
export const ERROR = 'ERROR'

export const alert = (msg, alertType = ERROR, timeout = 5000) => dispatch => {
  const id = uuidv4()

  dispatch({
    type: SET_ALERT,
    payload: { id, alertType, msg }
  })

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}

export const clearAlerts = () => dispatch => {
  dispatch({
    type: CLEAR_ALERTS,
  })
}
