import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from 'src/app/core/services/auth.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as authActions from '../actions/auth.actions';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService
  ) { }

  public login = createEffect(() => this.actions.pipe(
    ofType(authActions.loginStart),
    switchMap(action => this.authService.login(action.userName, action.password).pipe(
      map(user => user.token
        ? authActions.loginSuccess({ user })
        : authActions.loginFailed()),
      catchError(() => of(authActions.loginFailed()))
    ))
  ));

  public logout = createEffect(() => this.actions.pipe(
    ofType(authActions.logoutStart),
    switchMap(() => this.authService.logout().pipe(
      map(() => authActions.logoutSuccess()),
      catchError(() => of(authActions.logoutFailed()))
    ))
  ));

  public getAuthInfo = createEffect(() => this.actions.pipe(
    ofType(authActions.getAuthInfoStart),
    switchMap(() => this.authService.checkUserInfo().pipe(
      map(user => authActions.getAuthInfoSuccess({ user })),
      catchError(() => of(authActions.getAuthInfoFailed()))
    ))
  ));
}
