import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let auth = req;
    const token = this.loginService.getToken();
    if (token != null) {
      auth = auth.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next.handle(auth);
  }
}
