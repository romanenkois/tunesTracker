import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AlbumResponse, ArtistResponse, TrackResponse, UserTopItemsResponse } from '@dto/response.dto';
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

  public getUserTopItems(
    code: string,
    type: 'artists' | 'tracks',
    time_range?: 'short_term' | 'medium_term' | 'long_term',
    limit?: number,
    offset?: number
  ): Observable<UserTopItemsResponse> {
    let endpoint: string = `${environment.BASE_URL}/user-data/top-items/${type}`;

    if (time_range) {
      endpoint += `?time_range=${time_range}`;
    }
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
}
