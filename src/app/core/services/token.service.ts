import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }
}
