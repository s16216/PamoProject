import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';

describe('JwtInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule to mock HTTP requests
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true } // Provide the JwtInterceptor
      ]
    });

    httpMock = TestBed.inject(HttpTestingController); // Inject the HttpTestingController to control and mock HTTP requests
    httpClient = TestBed.inject(HttpClient); // Inject the HttpClient to make HTTP requests in tests
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding
  });

  it('should add an Authorization header if user token exists', () => {
    const user = { token: 'test-token' };
    localStorage.setItem('user', JSON.stringify(user)); // Set a user with token in localStorage

    httpClient.get('/test').subscribe(response => {
      // No need to handle the response here, we just want to trigger the request
    });

    const httpRequest = httpMock.expectOne('/test'); // Expect one request to the /test URL

    // Assert that the request has the Authorization header set correctly
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${user.token}`);
  });

  it('should not add an Authorization header if user token does not exist', () => {
    localStorage.removeItem('user'); // Ensure no user token in localStorage

    httpClient.get('/test').subscribe(response => {
      // No need to handle the response here, we just want to trigger the request
    });

    const httpRequest = httpMock.expectOne('/test'); // Expect one request to the /test URL

    // Assert that the request does not have the Authorization header
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });

  it('should not add an Authorization header if user is null', () => {
    localStorage.setItem('user', JSON.stringify(null)); // Set user as null in localStorage

    httpClient.get('/test').subscribe(response => {
      // No need to handle the response here, we just want to trigger the request
    });

    const httpRequest = httpMock.expectOne('/test'); // Expect one request to the /test URL

    // Assert that the request does not have the Authorization header
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });
});
