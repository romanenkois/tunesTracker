import { inject, Injectable } from '@angular/core';
import { TrackDTO } from '@dto/track';
import { DataRepository } from '@repository/data.repository';
import { ApiService } from '@service/api.service';

@Injectable({
  providedIn: 'root'
})
export class GetTrackCommand {
  private apiService: ApiService = inject(ApiService);
  private dataRepository: DataRepository = inject(DataRepository);

  public getTrack(id: string, market?: string) {
    this.apiService.getTrack(id, market).subscribe((response: TrackDTO) => {
      this.dataRepository.setTrackData(response);
      console.log('Track data:', response);
    });
  }
}
