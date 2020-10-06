import { createReducer, on, Action } from '@ngrx/store';
import { IAuthState } from '../interfaces/IAuthState';
import * as authActions from '../actions/auth.actions';

const inititalState: IAuthState = {
    error: false,
    user: null,
    loading: false,
};

const authenticationReducer = createReducer(
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
  on(authActions.gettingAuthInfoStart, state => ({
    ...state,
    loading: true,
    error: false,
    user: null,
  })),
  on(authActions.gettingAuthInfoSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    error: false,
    user
  })),
  on(authActions.gettingAuthInfoFailed, state => ({
    ...state,
    loading: false,
    error: true
  }))
);

export function reducer(state: IAuthState, action: Action): IAuthState {
  return authenticationReducer(state, action);
}
