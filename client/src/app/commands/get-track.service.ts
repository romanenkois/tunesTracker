import { inject, Injectable } from '@angular/core';
import { Track } from '@dto/track';
import { DataRepository } from '@repository/data.repository';
import { ApiService } from '@service/api.service';

@Injectable({
  providedIn: 'root'
})
export class GetTrackCommand {
  private apiService: ApiService = inject(ApiService);
  private dataRepository: DataRepository = inject(DataRepository);

  // this function is used to be get ST, and to be ensured that ST is available in repository
  private getSecretToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.dataRepository.getSecretToken() === '') {
        this.apiService.getSecretToken().subscribe((response: any) => {
          this.dataRepository.setSecretToken(response.access_token);
          resolve();
        }, (error: any) => {
          reject(error);
        });
      } else {
        resolve();
      }
    });
  }

  public getTrack(id: string, market?: string) {
    this.getSecretToken().then(() => {
      this.apiService.getTrack(id, market).subscribe((response: Track) => {
        this.dataRepository.setTrackData(response);
      });
    });
  }
}
