import api from 'util/api';
import { alertAndThrow } from './alert';

import { ADD_MEASUREMENT_SITE, ADD_MEASUREMENT_SITES } from 'reducers/measurementSite';
import { AppDispatch } from 'types/redux';

export const save = ({ name }:{ name: string }) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.post('/sites', {
      name,
    });
    dispatch({
      type: ADD_MEASUREMENT_SITE,
      payload: res.data,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};

export const getMeasurementSites = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get('/sites');

    dispatch({
      type: ADD_MEASUREMENT_SITES,
      payload: res.data.data,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};
