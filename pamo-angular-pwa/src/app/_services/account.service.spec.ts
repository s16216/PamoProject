import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AccountService } from './account.service';
import { User } from '../_model/user';
import { environment } from '../../environments/environment';

describe('AccountService', () => {
  let service: AccountService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService]
    });

    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in a user', () => {
    const mockUser: User = {
      username: 'testuser',
      token: 'testtoken',
      refreshToken: 'testrefreshtoken'
    };

    const loginData = { username: 'testuser', password: 'testpassword' };

    service.login(loginData).subscribe(() => {
      const currentUser = service.currentUserSource.value;
      expect(currentUser).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}Account/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should log out a user', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));

    service.logout();

    const currentUser = service.currentUserSource.value;
    expect(currentUser).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('should refresh token', () => {
    const mockUser: User = {
      username: 'testuser',
      token: 'newtoken',
      refreshToken: 'newrefreshtoken'
    };

    service.refreshToken('oldtoken', 'oldrefreshtoken').subscribe(user => {
      expect(user).toEqual(mockUser);
      const currentUser = service.currentUserSource.value;
      expect(currentUser).toEqual(mockUser);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}Account/refreshtoken`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });
});
