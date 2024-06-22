import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {switchMap, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../_services/account.service';

@Injectable()
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private accountService: AccountService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case 400:
              this.handle400Error(error);
              break;
              case 500:
              this.handle500Error(error);
              break;
            case 401:
              return this.handle401Error(request, next, error);
            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            default:
              this.toastr.error('Something unexpected went wrong ' + error.message);
              break;
          }
        }
        throw error;
      })
    );
  }

  private handle400Error(error: HttpErrorResponse): void {
    let errorMessage = 'Internal Server Error';

    if (error.error) {
      if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error.message) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    this.toastr.error(errorMessage);
    //this.router.navigateByUrl('/');
  }

  private handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    error: HttpErrorResponse
  ): Observable<HttpEvent<unknown>> {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    if (user?.refreshToken) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        const arg = {
          accessToken: user?.token,
          refreshToken: user?.refreshToken,
        };
        return this.accountService.refreshToken(arg.accessToken, arg.refreshToken).pipe(
          switchMap((response) => {
            this.isRefreshing = false;
            const newRequest = request.clone({
              setHeaders: {
                Authorization: `Bearer ${response.token}`,
              },
            });
            return next.handle(newRequest);
          }),
          catchError((refreshError) => {
            this.isRefreshing = false;
            this.toastr.error('Something unexpected went wrong during token refresh ' + refreshError);
            throw refreshError;
          })
        );
      } else {
        this.router.navigateByUrl('/login');
        return throwError('Token refresh already in progress');
      }
    } else {
      this.router.navigateByUrl('/login');
      return throwError(error);
    }
  }

  private handle500Error(error: HttpErrorResponse): void {
    let errorMessage = 'Internal Server Error';

    if (error.error) {
      if (typeof error.error === 'string') {
        errorMessage = error.error;
      } else if (error.error.message) {
        errorMessage = error.error.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    this.toastr.error(errorMessage);
    //this.router.navigateByUrl('/');
  }
}

