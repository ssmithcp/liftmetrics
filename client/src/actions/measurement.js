import api from '../util/api';
import { alertAndThrow } from './alert';
import { defaultRange } from './shared';

import { ADD_MEASUREMENT, ADD_MEASUREMENTS } from '../reducers/measurement';

export const save = ({ site, value, unit, side, flexed, created, note }) => async dispatch => {
  try {
    const res = await api.post('/sites/measurements', {
      site,
      value,
      unit,
      side,
      flexed,
      created,
      note,
    });
    dispatch({
      type: ADD_MEASUREMENT,
      payload: res.data,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};

export const getMeasurementFrom = (startDate) => async dispatch => {
  try {
    const res = await api.get('/sites/measurements', { params: { startDate } });

    dispatch({
      type: ADD_MEASUREMENTS,
      payload: res.data.data,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};

export const getMeasurements = () => getMeasurementFrom(defaultRange());