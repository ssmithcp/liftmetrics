import api from '../util/api'
import { alertAndThrow } from './alert'
import { defaultRange } from './shared'

import { ADD_WEIGHT, ADD_WEIGHTS } from '../reducers/weight'

export const save = ({ value, unit, created }) => async dispatch => {
  try {
    const res = await api.post('/weights', {
      value,
      unit,
      created,
    })
    dispatch({
      type: ADD_WEIGHT,
      payload: res.data,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const getWeightsFrom = (startDate) => async dispatch => {
  try {
    const res = await api.get('/weights', { params: { startDate } })

    dispatch({
      type: ADD_WEIGHTS,
      payload: res.data.data,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const getWeights = () => getWeightsFrom(defaultRange())