import { Component, inject } from '@angular/core';
import { config } from '@config/config';
import { AuthService } from 'app/shared/utils/authoriaztion';

@Component({
  selector: 'app-authorization-button',
  standalone: true,
  imports: [],
  templateUrl: './authorization-button.component.html',
  styleUrl: './authorization-button.component.scss'
})
export class AuthorizationButtonComponent {
  private authService: AuthService = inject(AuthService);

  url = this.authService.getLogInUrl();
}
