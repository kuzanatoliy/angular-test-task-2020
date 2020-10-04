import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IUser } from '../interfaces/IUser';

import { LOGIN_URL, LOGOUT_URL } from '../constants/urls';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
  ) { }

  public login(userName: string, password: string): Observable<IUser> {
    return this.http.post(`${ LOGIN_URL }`, { userName, password })
      .pipe(map(this.prepareUserData));
  }

  public logout(): Observable<IUser> {
    return this.http.post(`${ LOGOUT_URL }`, {})
      .pipe(map(this.prepareUserData));
  }

  private prepareUserData(data: any): IUser {
    const {
      id,
      userName,
      token
    } = data;
    return {
      id,
      userName,
      token
    };
  }
}
