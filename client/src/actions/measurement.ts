import api from 'util/api';
import { alertAndThrow } from './alert';
import { defaultRange } from './shared';

import { ADD_MEASUREMENT, ADD_MEASUREMENTS } from 'reducers/measurement';
import { AppDispatch } from 'store';

interface SaveMeasurementFields {
  site: string;
  value: string;
  unit: string;
  side: string;
  flexed: boolean;
  created?: Date;
  note?: string;
}

export const save = ({ site, value, unit, side, flexed, created, note }: SaveMeasurementFields) =>
  async (dispatch: AppDispatch) => {
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

export const getMeasurementFrom = (startDate: Date) => async (dispatch: AppDispatch) => {
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