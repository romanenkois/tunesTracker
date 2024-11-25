import { Component } from '@angular/core';
import { config } from '@config/config';

@Component({
  selector: 'app-authorization-button',
  standalone: true,
  imports: [],
  templateUrl: './authorization-button.component.html',
  styleUrl: './authorization-button.component.scss'
})
export class AuthorizationButtonComponent {
  private readonly BASE_URL: string = 'https://accounts.spotify.com/authorize?';
  private readonly client_id: string = config.SPOTIFY_CLIENT_ID;
  private readonly redirect_uri: string = config.SPOTIFY_REDIRECT_URI;
  private readonly response_type: string = 'code';
  private readonly state: string = config.SPOTIFY_STATE;
  private scopes: string[] = [
    'user-read-email',
    'user-read-private',

    'user-read-recently-played',
    'user-read-currently-playing',
    'user-top-read',
    'user-read-playback-position',
  ];
  private readonly scope: string = this.scopes.join('%20');
  private readonly show_dialog: string = config.SPOTIFY_SHOW_DIALOG_ON_AUTHORIZATION.toString();
  public readonly url: string = `${this.BASE_URL}client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=${this.response_type}&state=${this.state}&scope=${this.scope}&show_dialog=${this.show_dialog}`;

}
