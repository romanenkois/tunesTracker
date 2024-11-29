import { Component, inject } from '@angular/core';
import { config } from '@config/config';
import { AuthService } from 'app/shared/services/authorization.service';

@Component({
  selector: 'app-authorization-button',
  standalone: true,
  imports: [],
  templateUrl: './authorization-button.component.html',
  styleUrl: './authorization-button.component.scss',
})
export class AuthorizationButtonComponent {
  private authService: AuthService = inject(AuthService);

  url = config.OFFLINE_MODE ? './home' : this.authService.getLogInUrl();
}
