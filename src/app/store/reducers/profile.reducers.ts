import { createReducer, on, Action } from '@ngrx/store';
import { IProfileState } from '../interfaces/IProfileState';
import * as authActions from '../actions/profile.actions';

const inititalState: IProfileState = {
    error: false,
    profile: null,
    loading: false,
};

const reducer = createReducer(
  inititalState,
  on(authActions.getProfileStart, state => ({
    ...state,
    error: false,
    loading: true,
  })),
  on(authActions.getProfileSuccess, (state, { profile }) => ({
    ...state,
    loading: false,
    profile
  })),
  on(authActions.getProfileFailed, state => ({
    ...state,
    loading: false,
    error: true,
  }))
);

export function profileReducer(state: IProfileState, action: Action): IProfileState {
  return reducer(state, action);
}
