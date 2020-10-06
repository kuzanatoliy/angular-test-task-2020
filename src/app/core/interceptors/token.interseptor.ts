import { HttpEvent, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
  ) {}

  public intercept(request: HttpRequest<any>, next: any): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: { token },
      });
    }

    return next.handle(request);
  }
}
