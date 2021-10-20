import api from 'util/api';

import { PROFILE_UPDATED } from 'reducers/profile';
import { setProfile } from 'util/profileStorage';
import { alertAndThrow } from './alert';
import { AppDispatch } from 'store';

interface UserProfile {
  weightUnit: WeightUnit;
  lengthUnit: LengthUnit;
  avatar: string;
  weekStartDay: number;
  firstName: string;
  lastName: string;
  lastLogin: Date;
  roles: string[];
  availableWeightUnits: WeightUnit[];
  availableLengthUnits: LengthUnit[];
  availableMovementTypes: MovementType[];
}

export const profileUpdated = (profile: UserProfile | null) => (dispatch: AppDispatch) => {
  setProfile(profile);

  dispatch({
    type: PROFILE_UPDATED,
    payload: profile,
  });
};

export const getProfile = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.get('/profiles/me');
    profileUpdated(res.data)(dispatch);
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};

//XXX I think type UserProfile here is wrong, IIRC body only contains changed
//properties, not everything
export const update = (body: UserProfile) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.put('/profiles/me', body);
    profileUpdated(res.data)(dispatch);
  } catch (err) {
    alertAndThrow(err, dispatch);
  }
};