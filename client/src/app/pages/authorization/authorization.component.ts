import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataRepository } from '@repository/user-data.repository';
import { environment } from 'enviroments/environment.development';
import { AuthorizationButtonComponent } from "../../features/authorization-button/authorization-button.component";

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [AuthorizationButtonComponent],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export default class AuthorizationComponent {
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
        this.router.navigate(['/user-data']);
      } else if (params.error) {
        console.log('access denied'); // do sm else
      }
    });
  }
}
