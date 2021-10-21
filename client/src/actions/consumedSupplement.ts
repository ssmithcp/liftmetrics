import api from 'util/api';
import { alertAndThrow } from './alert';
import { defaultRange } from './shared';

import { ADD_CONSUMED_SUPPLEMENT, ADD_CONSUMED_SUPPLEMENTS } from '../reducers/consumedSupplement';
import { AppDispatch } from 'types/redux';

export const save = ({ supplement, servings }: { supplement: string, servings: string}) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await api.post('/supplements/consumed', {
        supplement,
        servings,
      });
      dispatch({
        type: ADD_CONSUMED_SUPPLEMENT,
        payload: res.data,
      });
    } catch (err) {
      alertAndThrow(err, dispatch);
    }
  };

export const getConsumedSupplementsFrom = (startDate: Date) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get('/supplements/consumed', { params: { startDate } });

    dispatch({
      type: ADD_CONSUMED_SUPPLEMENTS,
      payload: res.data.data,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};

export const getConsumedSupplements = () => getConsumedSupplementsFrom(defaultRange());