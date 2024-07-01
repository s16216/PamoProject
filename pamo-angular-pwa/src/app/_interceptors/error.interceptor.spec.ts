import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorInterceptor } from './error.interceptor';
import { AccountService } from '../_services/account.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, HttpRequest} from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('ErrorInterceptor', () => {
  let httpMock: HttpTestingController;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let accountService: jasmine.SpyObj<AccountService>;
  let router: jasmine.SpyObj<Router>;
  let httpClient: HttpClient;

  beforeEach(() => {
    toastrService = jasmine.createSpyObj('ToastrService', ['error']);
    accountService = jasmine.createSpyObj('AccountService', ['refreshToken']);
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
        { provide: ToastrService, useValue: toastrService },
        { provide: AccountService, useValue: accountService },
        { provide: Router, useValue: router },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle 400 error', () => {
    const errorMessage = 'Bad Request';
    httpClient.get('/test').subscribe(
      () => fail('should have failed with a 400 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(400);
        expect(toastrService.error).toHaveBeenCalledWith(errorMessage);
      }
    );

    const req = httpMock.expectOne('/test');
    req.flush({ message: errorMessage }, { status: 400, statusText: 'Bad Request' });
  });


  it('should handle 500 error', () => {
    const errorMessage = 'Internal Server Error';
    httpClient.get('/test').subscribe(
      () => fail('should have failed with a 500 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
        expect(toastrService.error).toHaveBeenCalledWith(errorMessage);
      }
    );

    const req = httpMock.expectOne('/test');
    req.flush({ message: errorMessage }, { status: 500, statusText: 'Internal Server Error' });
  });


  it('should redirect to login on 401 error if no refresh token', () => {
    localStorage.removeItem('user');

    httpClient.get('/test').subscribe(
      () => fail('should have failed with a 401 error'),
      (error: HttpErrorResponse) => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
      }
    );

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
  });

  it('should navigate to not-found on 404 error', () => {
    httpClient.get('/test').subscribe(
      () => fail('should have failed with a 404 error'),
      (error: HttpErrorResponse) => {
        expect(router.navigateByUrl).toHaveBeenCalledWith('/not-found');
      }
    );

    const req = httpMock.expectOne('/test');
    req.flush({}, { status: 404, statusText: 'Not Found' });
  });
});
