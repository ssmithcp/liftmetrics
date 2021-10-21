import api from 'util/api';
import { alertAndThrow } from './alert';
import { defaultRange } from './shared';

import { ADD_EXERCISE, ADD_EXERCISES } from '../reducers/exercise';
import { AppDispatch } from 'types/redux';

interface SaveExerciseFields {
  movement: string;
  sets: string;
  reps: string;
  value: Weight;
  unit: WeightUnit;
  created?: Date;
  note?: string;
}

export const save = ({ movement, sets, reps, value, unit, created, note }: SaveExerciseFields) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await api.post('/exercises', {
        movement,
        sets,
        reps,
        value,
        unit,
        created,
        note,
      });
      dispatch({
        type: ADD_EXERCISE,
        payload: res.data,
      });
    } catch (err) {
      alertAndThrow(err, dispatch);
    }
  };

export const getExerciesesFrom = (startDate: Date) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get('/exercises', { params: { startDate } });

    dispatch({
      type: ADD_EXERCISES,
      payload: res.data.data,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};

export const getExercises = () => getExerciesesFrom(defaultRange());

export const getExerciseById = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get(`/exercises/${ id }`);

    dispatch({
      type: ADD_EXERCISE,
      payload: res.data,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};

export const update = (id: string, body: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.put(`/exercises/${ id }`, body);

    dispatch({
      type: ADD_EXERCISE,
      payload: res.data,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};