import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private http: HttpClient = inject(HttpClient);


  constructor() {
    this.getSecretToken().then(() => {
      this.getUserPlaylists('31l6hgkzygyre6ijmn4xaqmbda3m');
      // this.getTrackData();
      // this.getUserId().then(() => {
      //   this.getUserPlaylists(this.userId());
      // });
    });
  }

  getSecretToken(): Promise<void> {
    const body = new URLSearchParams();
    body.append("grant_type", "client_credentials");
    body.append("client_id", this.CLIENT_ID);
    body.append("client_secret", this.CLIENT_SECRET);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    return new Promise<void>((resolve, reject) => {
      this.http.post('https://accounts.spotify.com/api/token', body.toString(), { headers })
        .subscribe((response: any) => {
          this.SECRET_TOKEN = response.access_token;
          resolve();
          console.log(this.SECRET_TOKEN);
        }, (error) => {
          reject(error);
        });
    });
  }


  getUserId(): Promise<void> {
    console.log(this.SECRET_TOKEN);
    return new Promise<void>((resolve, reject) => {
      this.http.get(`${this.BASE_URL}/v1/me`, {
        headers: {
          Authorization: `Bearer ${this.SECRET_TOKEN}`
        }
      }).subscribe((response: any) => {
        this.userId.set(response.id);
        resolve();
      }, (error) => {
        reject(error);
      });
    });
  }

  trackData: WritableSignal<any> = signal([]);
  getTrackData() {
    this.http.get(`${this.BASE_URL}/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V`, {
      headers: {
        Authorization: `Bearer ${this.SECRET_TOKEN}`
      }
    }).subscribe((response: any) => {
      this.trackData.set(response);
      console.log(this.trackData().album.artists);
    });
  }

  userPlaylists: WritableSignal<any> = signal([]);
  getUserPlaylists(userId: string) {
    this.http.get(`${this.BASE_URL}/v1/me/playlists`, {
      headers: {
        Authorization: `Bearer ${this.SECRET_TOKEN}`
      }
    }).subscribe((response: any) => {
      this.userPlaylists.set(response);
      console.log(this.userPlaylists());
    });
  };
}
