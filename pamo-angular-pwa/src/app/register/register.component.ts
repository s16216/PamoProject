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

  constructor(private http: HttpClient) {}

  onSubmit() {
    //const apiUrl = 'https://myrmesite-dev.azurewebsites.net/api/Account/register';
    const apiUrl = 'http://localhost:5000/api/Account/register';

    // Make the HTTP POST request with user data
    this.http.post(apiUrl, this.user).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        // Handle success, e.g., redirect to a success page or show a success message
      },
      (error) => {
        console.error('Registration failed:', error);
        // Handle error, e.g., display an error message to the user
      }
    );
  }
}
