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

  /**
   * Constructor to inject the necessary services.
   *
   * @param accountService - The service to manage account-related operations.
   * @param router - The router to navigate between routes.
   */
  constructor(public accountService: AccountService, private router: Router) {}

  /**
   * Lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit(): void {}

  /**
   * Toggles the menu open and close state.
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  /**
   * Closes the menu.
   */
  closeMenu(): void {
    this.isMenuOpen = false;
  }

  /**
   * Logs out the current user and navigates to the login page.
   */
  logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/login');
  }
}
