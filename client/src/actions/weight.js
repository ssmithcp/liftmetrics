import api from '../util/api'
import { alertAndThrow } from './alert'

import { ADD_WEIGHT, ADD_WEIGHTS } from '../reducers/weight'

const createdToDate = w => ({
  ...w,
  created: new Date(w.created)
})

export const save = ({ value, unit, created }) => async dispatch => {
  try {
    const res = await api.post('/weight', {
      value,
      unit,
      created,
    })
    dispatch({
      type: ADD_WEIGHT,
      payload: createdToDate(res.data),
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const getWeightsFrom = (startDate) => async dispatch => {
  try {
    const res = await api.get('/weight', { params: { startDate } })
    const weights = res.data.data.map(createdToDate)

    dispatch({
      type: ADD_WEIGHTS,
      payload: weights,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}