import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TrackDTO } from '@dto/track.dto';
import { DataRepository } from '@repository/data.repository';
import { environment } from 'enviroments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly http: HttpClient = inject(HttpClient);

  private dataRepository: DataRepository = inject(DataRepository);

  public getTrack(id: string, market?: string): Observable<TrackDTO> {
    return this.http.get<any>(
      `${environment.BASE_URL}/tracks/track/${id}`
    )
  }
}
