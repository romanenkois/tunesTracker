import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { config } from '@config/config';
import { AlbumResponse, ArtistResponse, TrackResponse, UserTopItemsResponse } from '@dto/index';
import { TimeFrame } from '@entity/index';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);

  // public execute<T>(func: Observable<T>): Observable<T> {
  //   return func;
  // }

  public getTrack(id: string, market?: string): Observable<TrackResponse> {
    return this.http.get<TrackResponse>(
      `${config.BASE_API_URL}/tracks/track/${id}${market ? `?market=${market}` : ''}`
    )
  }

  public getAudioFeatures(id: string): Observable<any> {
    return this.http.get<any>(
      `${config.BASE_API_URL}/tracks/audio-features/${id}`
    )
  }

  public getAlbum(id: string, market?: string): Observable<AlbumResponse> {
    return this.http.get<AlbumResponse>(
      `${config.BASE_API_URL}/albums/album/${id}${market ? `?market=${market}` : ''}` // custom api uses /album/:id, when spotify uses /albums/:id
    )
  }

  public getArtist(id: string): Observable<ArtistResponse> {
    return this.http.get<ArtistResponse>(
      `${config.BASE_API_URL}/artists/artist/${id}` // custom api uses /artists/:id, when spotify uses /artists/:id
    )
  }

  public getArtists(ids: Array<string>): Observable<any> {
    return this.http.get<any>(
      `${config.BASE_API_URL}/artists/artists/ids=${ids.join(',')}`
    )
  }

  public getUserProfile(code: string): Observable<any> {
    let headers = {
      'code': code
    }

    return this.http.get<any>(`${config.BASE_API_URL}/user-data/user-profile/`, { headers });
  }


  public authenticateUser(code: string): Observable<any> {
    let headers = {
      'code': code
    }
    return this.http.get<any>(`${config.BASE_API_URL}/user-data/authenticate/`, { headers })
  }

  public getUserTopItems(
    code: string,
    type: 'artists' | 'tracks',
    time_range: TimeFrame,
    limit?: number,
    offset?: number
  ): Observable<UserTopItemsResponse> {
    let endpoint: string = `${config.BASE_API_URL}/user-data/top-items/${type}`;

    endpoint += `?time_range=${time_range}`

    if (limit && limit > 0 && limit <= 50) {
      endpoint += `&limit=${limit}`;
    }
    if (offset) {
      endpoint += `&offset=${offset}`;
    }

    let headers = {
      'code': code
    }

    return this.http.get<UserTopItemsResponse>(endpoint, { headers });
  }

  public getUserTopAlbums(
    code: string,
    time_range: TimeFrame,
    limit: number
  ): Observable<UserTopItemsResponse> {
    let endpoint: string = `${config.BASE_API_URL}/user-data/top-albums`;

    endpoint += `?time_range=${time_range}`;
    endpoint += `&limit=${limit}`;

    let headers = {
      'code': code
    }

    return this.http.get<any>(endpoint, { headers });
  }

  public getUserTopGenres(
    code: string,
    time_range: TimeFrame,
    limit: number
  ): Observable<any> {
    let endpoint = `${config.BASE_API_URL}/user-data/top-genres`

    endpoint += `?time_range=${time_range}`;
    endpoint += `&limit=${limit}`;

    let headers = {
      'code': code
    }
    return this.http.get<any>(endpoint, { headers });
  }
}
