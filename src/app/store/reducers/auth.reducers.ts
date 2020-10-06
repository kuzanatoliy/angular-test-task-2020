import { createReducer, on, Action } from '@ngrx/store';
import { IAuthState } from '../interfaces/IAuthState';
import * as authActions from '../actions/auth.actions';

const inititalState: IAuthState = {
    error: false,
    user: null,
    loading: false,
};

const reducer = createReducer(
  inititalState,
  on(authActions.loginStart, state => ({
    ...state,
    error: false,
    loading: true,
  })),
  on(authActions.loginSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user
  })),
  on(authActions.loginFailed, state => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(authActions.logoutStart, state => ({
    ...state,
    error: false,
    loading: true,
  })),
  on(authActions.logoutSuccess, state => ({
    ...state,
    loading: false,
    error: false,
    user: null
  })),
  on(authActions.logoutFailed, state => ({
    ...state,
    loading: false,
    error: true,
  })),
  on(authActions.getAuthInfoStart, state => ({
    ...state,
    loading: true,
    error: false,
    user: null,
  })),
  on(authActions.getAuthInfoSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    error: false,
    user
  })),
  on(authActions.getAuthInfoFailed, state => ({
    ...state,
    loading: false,
    error: true
  }))
);

export function authReducer(state: IAuthState, action: Action): IAuthState {
  return reducer(state, action);
}
