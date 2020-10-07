import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/core/services/auth.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { IUser } from 'src/app/core/interfaces';
import { TokenService } from 'src/app/core/services/token.service';
import * as authActions from '../actions/auth.actions';
import { IAuthState } from '../interfaces';

@Injectable()
export class AuthEffects {
  private user: IUser;

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private tokenService: TokenService,
    private store: Store<{ authInfo: IAuthState }>
  ) {
    this.store.pipe(select('authInfo'))
      .subscribe((authInfo: IAuthState) => {
      this.user = authInfo.user;
    });
  }

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
    switchMap(() => {
      if (!this.user && this.tokenService.getToken()) {
        return this.authService.checkUserInfo().pipe(
          map(user => {
            if (!user.userName) {
              this.tokenService.setToken(null);
              return authActions.getAuthInfoSuccess({ user: null });
            }

            return authActions.getAuthInfoSuccess({ user });
          }),
          catchError(() => of(authActions.getAuthInfoFailed()))
        );
      }
      return of(authActions.getAuthInfoSuccess({ user: this.user }));
    })
  ));
}
