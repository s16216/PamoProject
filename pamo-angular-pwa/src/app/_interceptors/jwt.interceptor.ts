import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  /**
   * Intercepts HTTP requests to add JWT token to the Authorization header if available.
   *
   * @param request - The outgoing HTTP request.
   * @param next - The next interceptor in the chain or the backend if no other interceptors are present.
   * @returns An Observable of the HTTP event.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (user && user.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }
    return next.handle(request);
  }
}
