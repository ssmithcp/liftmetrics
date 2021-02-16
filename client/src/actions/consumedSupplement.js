import api from '../util/api'
import { alertAndThrow } from './alert'
import { defaultRange } from './shared'

import { ADD_CONSUMED_SUPPLEMENT, ADD_CONSUMED_SUPPLEMENTS } from '../reducers/consumedSupplement'

export const save = ({ site, servings }) => async dispatch => {
  try {
    const res = await api.post('/supplement/consumed', {
      site,
      servings,
    })
    dispatch({
      type: ADD_CONSUMED_SUPPLEMENT,
      payload: res.data,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const getConsumedSupplementsFrom = (startDate) => async dispatch => {
  try {
    const res = await api.get('/supplement/consumed', { params: { startDate } })

    dispatch({
      type: ADD_CONSUMED_SUPPLEMENTS,
      payload: res.data.data,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const getMeasurements = () => getConsumedSupplementsFrom(defaultRange())