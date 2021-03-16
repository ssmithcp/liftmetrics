import api from '../util/api'
import { alertAndThrow } from './alert'
import { defaultRange } from './shared'

import { ADD_EXERCISE, ADD_EXERCISES } from '../reducers/exercise'

export const save = ({ movement, sets, reps, value, unit, created, note }) => async dispatch => {
  try {
    const res = await api.post('/exercises', {
      movement,
      sets,
      reps,
      value,
      unit,
      created,
      note,
    })
    dispatch({
      type: ADD_EXERCISE,
      payload: res.data,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const getExerciesesFrom = (startDate) => async dispatch => {
  try {
    const res = await api.get('/exercises', { params: { startDate } })

    dispatch({
      type: ADD_EXERCISES,
      payload: res.data.data,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const getExercises = () => getExerciesesFrom(defaultRange())