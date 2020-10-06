import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProfileService } from 'src/app/core/services/profile.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as profileActions from '../actions/profile.actions';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions: Actions,
    private profileService: ProfileService
  ) { }

  public getProfile = createEffect(() => this.actions.pipe(
    ofType(profileActions.getProfileStart),
    switchMap(action => this.profileService.getProfile(action.id).pipe(
      map(profile => profile.id
        ? profileActions.getProfileSuccess({ profile })
        : profileActions.getProfileFailed()),
      catchError(() => of(profileActions.getProfileFailed()))
    ))
  ));
}
