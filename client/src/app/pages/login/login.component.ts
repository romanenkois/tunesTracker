import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataRepository } from '@repository/user-data.repository';
import { AuthorizationButtonComponent } from "@feature/authorization-button/authorization-button.component";
import { config } from '@config/config';
import { AuthService } from 'app/shared/utils/authoriaztion';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthorizationButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  private authService: AuthService = inject(AuthService);

  constructor() {
    this.authService.authorizeUser();
  }
}
