import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/core/interfaces';

export enum ActionTypes {
  loginStart = '[Auth] login start',
  loginSuccess = '[Auth] login success',
  loginFailed = '[Auth] login failed',
  logoutStart = '[Auth] logout start',
  logoutSuccess = '[Auth] logout success',
  logoutFailed = '[Auth] logout failed'
}

export const loginStart = createAction(
  ActionTypes.loginStart,
  props<{ userName: string, password: string }>()
);

export const loginSuccess = createAction(
  ActionTypes.loginSuccess,
  props<{ user: IUser }>()
);

export const loginFailed = createAction(
  ActionTypes.loginFailed
);

export const logoutStart = createAction(
  ActionTypes.logoutStart
);

export const logoutSuccess = createAction(
  ActionTypes.logoutSuccess
);

export const logoutFailed = createAction(
  ActionTypes.logoutFailed
);
