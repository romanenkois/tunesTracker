import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out-button',
  standalone: true,
  imports: [],
  templateUrl: './log-out-button.component.html',
  styleUrl: './log-out-button.component.scss'
})
export class LogOutButtonComponent {
  private router: Router = inject(Router);

  logOutUser() {
    sessionStorage.clear();
    localStorage.clear(); // not needed, but just in case
    this.router.navigate(['/']);
  }
}
