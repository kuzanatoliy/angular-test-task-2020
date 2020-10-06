import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { TokenService } from 'src/app/core/services/token.service';

import { loginStart } from 'src/app/store/actions/auth.actions';
import { IAuthState } from 'src/app/store/interfaces/IAuthState';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public error = false;
  public authInfo: Observable<IAuthState>;

  public authData = new FormGroup({
    password: new FormControl('', [ Validators.required ]),
    userName: new FormControl('', [ Validators.required ]),
  });

  private subscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<{ authInfo: IAuthState }>,
    private tokenService: TokenService
  ) { }

  public loginHandler(): void {
    this.store.dispatch(loginStart(this.authData.value));
  }

  public ngOnInit(): void {
    this.authInfo = this.store.pipe(select('authInfo'));
    this.subscription = this.authInfo.subscribe((authInfo: IAuthState) => {
      const { error, user } = authInfo;
      this.error = error;
      if (user && user.userName) {
        this.tokenService.setToken(user.token);
        this.router.navigate([`profile/${ user.id }`]);
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
