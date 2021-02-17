import api from '../util/api'
import { alertAndThrow } from './alert'

import { ADD_MOVEMENT, ADD_MOVEMENTS } from '../reducers/movement'

export const save = ({ name, type, targetedMuscles, modifiers }) => async dispatch => {
  try {
    const res = await api.post('/movement', {
      name,
      type,
      targetedMuscles,
      modifiers,
    })
    dispatch({
      type: ADD_MOVEMENT,
      payload: res.data,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const update = ({ id, name, type, targetedMuscles, modifiers }) => async dispatch => {
  try {
    const res = await api.put('/movement/' + id, {
      name,
      type,
      targetedMuscles,
      modifiers,
    })
    dispatch({
      type: ADD_MOVEMENT,
      payload: res.data,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const getMovements = () => async dispatch => {
  try {
    const res = await api.get('/movement')

    dispatch({
      type: ADD_MOVEMENTS,
      payload: res.data.data,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}
