import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: any;
  memberUrl: string = environment.baseUrl + 'Account/GetAllUsers';

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   * Initiates the retrieval of users.
   */
  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Constructor to inject the necessary services.
   *
   * @param httpClient - The HTTP client to make requests.
   */
  constructor(private httpClient: HttpClient) {}

  /**
   * Retrieves the list of users from the server.
   * Subscribes to the HTTP GET request and handles the response, error, and completion.
   */
  getUsers(): void {
    this.httpClient.get(this.memberUrl).subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log(this.users)
    });
  }
}
