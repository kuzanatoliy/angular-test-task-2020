import { createAction, props } from '@ngrx/store';
import { IProfile } from 'src/app/core/interfaces';

export enum ActionTypes {
  getProfileStart = '[Profile] get profile start',
  getProfileSuccess = '[Profile] get profile success',
  getProfileFailed = '[Profile] get profile failed',
}

export const getProfileStart = createAction(
  ActionTypes.getProfileStart,
  props<{ id: string }>()
);

export const getProfileSuccess = createAction(
  ActionTypes.getProfileSuccess,
  props<{ profile: IProfile }>()
);

export const getProfileFailed = createAction(
  ActionTypes.getProfileFailed
);
