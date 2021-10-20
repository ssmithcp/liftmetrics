import api from 'util/api';
import { alertAndThrow } from './alert';

import { ADD_MOVEMENT, ADD_MOVEMENTS } from 'reducers/movement';
import { AppDispatch } from 'store';

interface SaveMovementFields {
  name: string;
  type: string;
  targetedMuscles: string[];
  modifiers: string[];
}

interface UpdateMovementFields extends SaveMovementFields {
  id: string;
}

export const save = ({ name, type, targetedMuscles, modifiers }: SaveMovementFields) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await api.post('/movements', {
        name,
        type,
        targetedMuscles,
        modifiers,
      });
      dispatch({
        type: ADD_MOVEMENT,
        payload: res.data,
      });
    } catch (err) {
      alertAndThrow(err, dispatch);
    }
  };

export const update = ({ id, name, type, targetedMuscles, modifiers }: UpdateMovementFields) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await api.put(`/movements/${ id }`, {
        name,
        type,
        targetedMuscles,
        modifiers,
      });
      dispatch({
        type: ADD_MOVEMENT,
        payload: res.data,
      });
    } catch (err) {
      alertAndThrow(err, dispatch);
    }
  };

export const getMovements = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get('/movements');

    dispatch({
      type: ADD_MOVEMENTS,
      payload: res.data.data,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};

export const getMovementById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get(`/movements/${ id }`);

    dispatch({
      type: ADD_MOVEMENT,
      payload: res.data,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};
