import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataRepository } from '@repository/data.repository';
import { environment } from 'enviroments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);

  private dataRepository: DataRepository = inject(DataRepository);

  public getTrack(id: string, market?: string): Observable<any> {
    return this.http.get<any>(
      `${environment.BASE_URL}/v1/tracks/${id}`,
      {headers: {
        Authorization: `Bearer ${this.dataRepository.getSecretToken()}`,
        ...(market ? {market} : {})
      }}
    )
  }

  public getSecretToken(): Observable<any> {
    const body = new URLSearchParams();
    body.append("grant_type", "client_credentials");
    body.append("client_id", environment.CLIENT_ID);
    body.append("client_secret", environment.CLIENT_SECRET);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.http.post<any>(
      'https://accounts.spotify.com/api/token',
      body.toString(),
      { headers });
  }
}
