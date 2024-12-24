import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { config } from '@config/config';
import { UserDataRepository } from '@repository/index';
import { ApiService } from '@service/index';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router: Router = inject(Router);
  private activeRouter: ActivatedRoute = inject(ActivatedRoute);

  private apiService: ApiService = inject(ApiService);
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
    let show_dialog: string =
      config.SPOTIFY_SHOW_DIALOG_ON_AUTHORIZATION.toString();

    let url: string = `${BASE_URL}client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&state=${state}&scope=${scope}&show_dialog=${show_dialog}`;
    return url;
  }

  // it used in login page onload, it checks the params for 'code',
  // that is used by back later, to get reusable refresh token.
  // then, it sends the 'code' to back end, and then it decides whether or not to let user in
  public authorizeUser(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.activeRouter.queryParams.subscribe((params: any) => {
        // url would be loaded with error param, if user declined in spotify auth page
        if (params.error) {
          this.router.navigate(['/login']);
          reject();
        }
        // if 'code' is provided, with right 'state', we will try to authanticate user in system
        if (params.code && params.state === config.SPOTIFY_STATE) {
          this.authenticateUser(params.code).then((res: any) => {
            if (res['responseStatus'] == 'access granted' && res['userData']) {
              this.userDataRepository.setUserCode(params.code);
              this.userDataRepository.setUserProfile(res['userData']);
              this.router.navigate(['/home']);
              resolve();
            } else {
              console.log('no server access');
              reject();
            }
          });
        }
        // if there is nothing, then we just do nothing
        else {
          resolve();
        }
      });
    });
  }

  // idk, useless func, should be removed ????????????
  public authenticateUser(code: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.authenticateUser(code).subscribe(
        (res) => {
          // console.log(res)
          resolve(res);
        },
        (error) => {
          console.log('auth error', error);
          reject(false);
        }
      );
    });
  }

  public logOutUser(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
    // window.location.reload(); // just like... to be sure
  }
}
