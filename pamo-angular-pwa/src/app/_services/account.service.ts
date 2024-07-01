import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../_model/user";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl: string = environment.baseUrl;
  public currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Logs in a user with the given credentials.
   *
   * @param model - The login credentials.
   * @returns An Observable of the logged-in user.
   */
  login(model: any): Observable<void> {
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  /**
   * Logs out the current user.
   */
  logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  /**
   * Refreshes the authentication tokens.
   *
   * @param accessToken - The current access token.
   * @param refreshToken - The refresh token.
   * @returns An Observable of the refreshed user data.
   */
  refreshToken(accessToken: string, refreshToken: string): Observable<User> {
    const requestBody = {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*',
    });

    return this.http.post<User>(this.baseUrl + 'Account/refreshtoken', requestBody, { headers: headers }).pipe(
      map((response: User) => {
        localStorage.setItem('user', JSON.stringify(response));
        this.currentUserSource.next(response);
        return response;
      })
    );
  }
}
