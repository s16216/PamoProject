import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

/**
 * The RegisterComponent is responsible for handling the user registration process.
 *
 * @export
 * @class RegisterComponent
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  /**
   * The user object containing registration details.
   *
   * @type {{ username: string; firstName: string; lastName: string; email: string; phoneNumber: string; password: string }}
   * @memberof RegisterComponent
   */
  user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  };

  /**
   * Creates an instance of RegisterComponent.
   *
   * @param {HttpClient} http - The HttpClient instance used for making HTTP requests.
   * @param {ToastrService} toastr - The ToastrService instance used for displaying notifications.
   * @param {Router} router - The Router instance used for navigating between routes.
   * @memberof RegisterComponent
   */
  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {}

  /**
   * Handles the form submission for user registration.
   *
   * Makes an HTTP POST request to the registration API with the user data,
   * and shows a success or error message based on the response.
   *
   * @memberof RegisterComponent
   */
  onSubmit() {
    const apiUrl: string = environment.baseUrl + 'Account/register';

    // Make the HTTP POST request with user data
    this.http.post(apiUrl, this.user).subscribe(
      (response) => {
        this.toastr.success('Potwierdz adres email');
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
