import api from '../util/api'
import { alertAndThrow } from './alert'

import { ADD_MEASUREMENT_SITE, ADD_MEASUREMENT_SITES } from '../reducers/measurementSite'

export const save = ({ name }) => async dispatch => {
  try {
    const res = await api.post('/measurement/site', {
      name,
    })
    dispatch({
      type: ADD_MEASUREMENT_SITE,
      payload: res.data,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}

export const getMeasurementSites = () => async dispatch => {
  try {
    const res = await api.get('/measurement/site')

    dispatch({
      type: ADD_MEASUREMENT_SITES,
      payload: res.data.data,
    })
  } catch (err) {
    alertAndThrow(err, dispatch)
  }
}
