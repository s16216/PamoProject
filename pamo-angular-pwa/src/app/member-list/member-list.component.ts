import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit{

  users: any;


  ngOnInit(): void {
    this.getUsers()
  }
  constructor(private httpClient: HttpClient) {
  }


  getUsers() {
    this.httpClient.get('https://myrmesite-dev.azurewebsites.net/api/Account/GetAllUsers').subscribe({
    //this.httpClient.get('https://localhost:5001/api/Account/GetAllUsers').subscribe({
      next: response => this.users = response,
      error: error => console.log(error),
      complete: () => console.log(this.users)
    })

  }
}
