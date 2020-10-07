import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getAuthInfoStart } from 'src/app/store/actions/auth.actions';
import { IAuthState } from 'src/app/store/interfaces/IAuthState';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private userInfo: Observable<IAuthState>;

  constructor(
    private router: Router,
    private store: Store<{ authInfo: IAuthState }>,
  ) {
    this.userInfo = this.store.pipe(select('authInfo'));
    this.store.dispatch(getAuthInfoStart());
  }

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.userInfo.pipe(map((state: IAuthState) => {
      const isAuth = !!(state.user && state.user.userName);

      if (!isAuth) {
        this.router.navigate(['login']);
      }

      return isAuth;
    }));
  }
}
