// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {
//
// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  };

  constructor(private http: HttpClient,private toastr: ToastrService, private router: Router) {}

  onSubmit() {
    const apiUrl: string = environment.baseUrl + 'Account/register';

    // Make the HTTP POST request with user data
    this.http.post(apiUrl, this.user).subscribe(
      (response) => {
        this.toastr.success('Potwierdz adres email');
      },
      (error) => {
        //console.error('Registration failed:', error);
        this.toastr.error(error.error.message)
      }
    );
  }
}
