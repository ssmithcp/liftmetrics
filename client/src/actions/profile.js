import api from '../util/api';

import { PROFILE_UPDATED } from '../reducers/profile';
import { setProfile } from '../util/profileStorage';
import { alertAndThrow } from './alert';

export const profileUpdated = profile => dispatch => {
  setProfile(profile);

  dispatch({
    type: PROFILE_UPDATED,
    payload: profile,
  });
};

export const getProfile = () => async dispatch => {
  try {
    const res = await api.get('/profiles/me');
    profileUpdated(res.data)(dispatch);
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};

export const update = body => async dispatch => {
  try {
    const res = await api.put('/profiles/me', body);
    profileUpdated(res.data)(dispatch);
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};