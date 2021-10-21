import api from 'util/api';
import { alertAndThrow } from './alert';

import { ADD_SUPPLEMENT, ADD_SUPPLEMENTS } from 'reducers/supplement';
import { AppDispatch } from 'types/redux';

interface SaveSupplementFields {
  name: string;
  value: string;
  unit: string;
}

export const save = ({ name, value, unit }: SaveSupplementFields) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await api.post('/supplements', {
        name,
        value,
        unit,
      });
      dispatch({
        type: ADD_SUPPLEMENT,
        payload: res.data,
      });
    } catch (err) {
      alertAndThrow(err, dispatch);
    }
  };

export const getSupplements = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get('/supplements');

    dispatch({
      type: ADD_SUPPLEMENTS,
      payload: res.data.data,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};
