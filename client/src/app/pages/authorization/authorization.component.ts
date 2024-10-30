import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataRepository } from '@repository/user-data.repository';
import { environment } from 'enviroments/environment.development';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export default class AuthorizationComponent {
  private activeRouter: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  private userDataRepository: UserDataRepository = inject(UserDataRepository);

  // for page when loaded with out a login
  private readonly BASE_URL: string = 'https://accounts.spotify.com/authorize?';
  private readonly client_id: string = environment.SPOTIFY_CLIENT_ID;
  private readonly redirect_uri: string = 'http://localhost:4200/login';
  private readonly response_type: string = 'code'; // ????? code or token
  private readonly state: string = '37';
  private scopes: string[] = [
    'user-read-email',
    'user-read-private',

    'user-read-recently-played',
    'user-read-currently-playing',
    'user-top-read',
    'user-read-playback-position',
  ];
  private readonly scope: string = this.scopes.join('%20');
  public readonly url: string = `${this.BASE_URL}client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=${this.response_type}&state=${this.state}&scope=${this.scope}`;

  // when page loads, we check,
  //  either user is not logged in, or logged in,
  //  or just logged in, or rejected login
  constructor() {
    this.activeRouter.queryParams.subscribe((params: any) => {
      if (params.code) {
        this.userDataRepository.setUserCode(params.code);
        this.router.navigate(['/user-data']);
      } else if (params.error) {
        console.log('access denied'); // do sm else
      }
    });
  }
}
