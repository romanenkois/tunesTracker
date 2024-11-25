import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from '@config/config';
import { UserDataRepository } from '@repository/index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router: Router = inject(Router);
  private activeRouter: ActivatedRoute = inject(ActivatedRoute);

  private userDataRepository: UserDataRepository = inject(UserDataRepository);

  public getLogInUrl(): string {
    let BASE_URL: string = 'https://accounts.spotify.com/authorize?';
    let client_id: string = config.SPOTIFY_CLIENT_ID;
    let redirect_uri: string = config.SPOTIFY_REDIRECT_URI;
    let response_type: string = 'code';
    let state: string = config.SPOTIFY_STATE;
    let scopes: string[] = [
      'user-read-email',
      'user-read-private',

      'user-read-recently-played',
      'user-read-currently-playing',
      'user-top-read',
      'user-read-playback-position',
    ];
    let scope: string = scopes.join('%20');
    let show_dialog: string = config.SPOTIFY_SHOW_DIALOG_ON_AUTHORIZATION.toString();

    let url: string = `${BASE_URL}client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&state=${state}&scope=${scope}&show_dialog=${show_dialog}`;
    return url;
  }

  public authorizeUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.activeRouter.queryParams.subscribe((params: any) => {
        if (params.code && params.state === config.SPOTIFY_STATE) {
          this.userDataRepository.setUserCode(params.code);
          this.router.navigate(['/home']);
          resolve();
        } else if (params.error) {
          console.log('access denied'); // do sm else
          reject();
        }
      });
    });
  }

  // this.apiService.getUserProfile(userCode).subscribe(
  //   (res: any) => {
  //     console.log(res);
  //     if (res == 'error_87') {
  //       this.userDataRepository.setUserCode('');
  //     }

  //     // console.log('up init', res);
  //     // this.userDataRepository.setUserProfile(res)
  //   },
  //   (error: any) => {
  //     console.log('ERROR_55', error)
  //   }
  // )

  public logOutUser(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/']);
    window.location.reload(); // just like... to be sure
  }
}
