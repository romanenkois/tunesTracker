import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataRepository } from '@repository/user-data.repository';
import { AuthorizationButtonComponent } from "@feature/authorization-button/authorization-button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthorizationButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  private activeRouter: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  private userDataRepository: UserDataRepository = inject(UserDataRepository);

  private readonly state = '37';

  // when page loads, we check,
  // either user is accepted spotify login or denied access
  constructor() {
    this.activeRouter.queryParams.subscribe((params: any) => {
      if (params.code && params.state === this.state) {
        this.userDataRepository.setUserCode(params.code);
        this.router.navigate(['/home']);
      } else if (params.error) {
        console.log('access denied'); // do sm else
      }
    });
  }
}
