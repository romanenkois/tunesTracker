import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/services/authorization.service';

@Component({
  selector: 'app-log-out-button',
  standalone: true,
  imports: [],
  templateUrl: './log-out-button.component.html',
  styleUrl: './log-out-button.component.scss'
})
export class LogOutButtonComponent {
  private authService: AuthService = inject(AuthService);

  logOutUser() {
    this.authService.logOutUser();
  }
}
