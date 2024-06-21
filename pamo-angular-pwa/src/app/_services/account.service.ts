import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import {User} from "../_model/user";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  //baseUrl: string = 'https://myrmesite-dev.azurewebsites.net/api/';
  baseUrl: string = 'http://localhost:5000/api/';
  private currentUserSource = new BehaviorSubject<User | null>(null)
  currentUser$ = this.currentUserSource.asObservable();


  constructor(private http: HttpClient) {
  }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'Account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user)
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }


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
