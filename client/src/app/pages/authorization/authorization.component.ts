import { Component } from '@angular/core';
import { environment } from 'enviroments/environment.development';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export default class AuthorizationComponent {
  private readonly BASE_URL: string = 'https://accounts.spotify.com/authorize?';

  private readonly client_id: string = environment.SPOTIFY_CLIENT_ID;
  private readonly redirect_uri: string = 'http://localhost:4200/user-data';
  private readonly response_type: string = 'token'; // ?????
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
}
