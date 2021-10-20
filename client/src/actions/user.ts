import api from 'util/api';

import { profileUpdated } from './profile';

import { alertAndThrow } from './alert';
import { RESET } from 'reducers/shared';

import { AppDispatch } from 'store';

export interface RegistrationFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = (formData: RegistrationFields) => async (dispatch: AppDispatch) => {
  try {
    await api.post('/users/register', formData);

    const res = await api.get('/profiles/me');
    profileUpdated(res.data)(dispatch);
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};

export interface LoginFields {
  email: string;
  password: string;
}

export const login = (formData: LoginFields) => async (dispatch: AppDispatch) => {
  try {
    await api.post('/users/login', formData);

    const res = await api.get('/profiles/me');
    profileUpdated(res.data)(dispatch);
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  try {
    await api.get('/users/logout');
    profileUpdated(null)(dispatch);
    dispatch({
      type: RESET,
    });
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};