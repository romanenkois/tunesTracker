import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AlbumResponse, ArtistResponse, TrackResponse } from '@dto/response.dto';
import { environment } from 'enviroments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);

  public getTrack(id: string, market?: string): Observable<TrackResponse> {
    return this.http.get<TrackResponse>(
      `${environment.BASE_URL}/tracks/track/${id}${market ? `?market=${market}` : ''}`
    )
  }

  public getAlbum(id: string, market?: string): Observable<AlbumResponse> {
    return this.http.get<AlbumResponse>(
      `${environment.BASE_URL}/albums/album/${id}${market ? `?market=${market}` : ''}` // custom api uses /album/:id, when spotify uses /albums/:id
    )
  }

  public getArtist(id: string): Observable<ArtistResponse> {
    return this.http.get<ArtistResponse>(
      `${environment.BASE_URL}/artists/artist/${id}` // custom api uses /artists/:id, when spotify uses /artists/:id
    )
  }

  // public getUserTopItems(code: string, type: 'artist' | 'tracks', time_range?: 'short_term' | 'medium_term' | 'long_term', limit?: number, offset?: number): Observable<any> {
  //   let endpoint: string = `${environment.BASE_URL}/user-data/top-items/${type}`;

  //   if (time_range) {
  //     endpoint += `?time_range=${time_range}`;
  //   }
  //   if (limit) {
  //     endpoint += `&limit=${limit}`;
  //   }
  //   if (offset) {
  //     endpoint += `&offset=${offset}`;
  //   }

  //   let headers = {
  //     'code': code
  //   }

  //   return this.http.get(endpoint, { headers });
  // }

  public getUserTopItemsDirect(tokenAC: string, type: 'artist' | 'tracks', time_range?: 'short_term' | 'medium_term' | 'long_term', limit?: number, offset?: number): Observable<any> {
    let endpoint: string = `https://api.spotify.com/v1/me/top/artists`;

    if (time_range) {
      endpoint += `?time_range=${time_range}`;
    }
    if (limit) {
      endpoint += `&limit=${limit}`;
    }
    if (offset) {
      endpoint += `&offset=${offset}`;
    }

    let headers = {
      'Authorization': `Bearer ${tokenAC}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.get(endpoint, { headers });
  }

  // to be deprecated later on
  public getUserccessToken(code: string): Observable<any> {
    const body = new URLSearchParams();
    body.append('grant_type', "authorization_code");
    body.append('redirect_uri', 'http://localhost:4200/login');
    body.append('code', code);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(environment.SPOTIFY_CLIENT_ID + ':' + environment.SPOTIFY_CLIENT_SECRET)
    };

    console.log('hhh', headers)
    console.log('body ',body.toString());

    return this.http.post<any>(
      'https://accounts.spotify.com/api/token',
      body.toString(),
      { headers });
  }
}
