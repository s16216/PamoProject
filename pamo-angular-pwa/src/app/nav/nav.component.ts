import { Component, OnInit } from '@angular/core';
import { AccountService } from "../_services/account.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isMenuOpen = false;

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}



  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
