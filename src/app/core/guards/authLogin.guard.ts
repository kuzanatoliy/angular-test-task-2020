import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { gettingAuthInfoStart } from 'src/app/store/actions/auth.actions';
import { IAuthState } from 'src/app/store/interfaces/IAuthState';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginGuard implements CanActivate {
  private authInfo: Observable<IAuthState>;

  constructor(
    private router: Router,
    private store: Store<{ authInfo: IAuthState }>,
  ) {
    this.authInfo = this.store.pipe(select('authInfo'));
    this.store.dispatch(gettingAuthInfoStart());
  }

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.authInfo.pipe(map((state: IAuthState) => {
      const isAuth = !!(state.user && state.user.userName);

      if (isAuth) {
        this.router.navigate(['profile']);
      }

      return !isAuth;
    }));
  }
}
