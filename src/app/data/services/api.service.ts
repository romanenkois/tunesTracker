import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DataRepository } from '@repository/data.repository';
import { environment } from 'enviroments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);

  private dataRepository: DataRepository = inject(DataRepository);

  public getTrack(id: string, market?: string) {
    this.http.get(
      `${environment.BASE_URL}/v1/tracks/${id}`,
      {headers: {
        Authorization: `Bearer ${this.dataRepository.getSecretToken()}`,
        ...(market ? {market} : {})
      }}
    ).subscribe((response: any) => {
      this.dataRepository.setTrackData(response);
      console.log(response);
    });
  }

  public getSecretToken(): any {
    const body = new URLSearchParams();
    body.append("grant_type", "client_credentials");
    body.append("client_id", environment.CLIENT_ID);
    body.append("client_secret", environment.CLIENT_SECRET);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    this.http.post(
      'https://accounts.spotify.com/api/token',
      body.toString(),
      { headers }).subscribe((response: any) => {
        this.dataRepository.setSecretToken(response.access_token);
        // return response.access_token; // probably would be refactored to return a signal
      }
    );
  }
}


