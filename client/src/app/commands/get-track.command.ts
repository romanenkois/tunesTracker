import { inject, Injectable } from '@angular/core';
import { TrackResponse } from '@dto/response.dto';
import { TrackDTO } from '@dto/track.dto';
import { TrackMapper } from '@mapper/track.mapper';
import { TrackDataRepository } from '@repository/track-data.repository';
import { ApiService } from '@service/api.service';

@Injectable({ providedIn: 'root' })
export class GetTrackCommand {
  private apiService: ApiService = inject(ApiService);
  private trackRepository: TrackDataRepository = inject(TrackDataRepository);

  public getTrack(id: string, market?: string) {
    this.apiService.getTrack(id, market).subscribe((response: TrackResponse) => {
      if (response && (response as TrackDTO).id !== undefined) {
        this.trackRepository.setTrackData(TrackMapper.toEntity(response as TrackDTO));
      } else {
        console.error('Error retrieving track data:', response);
      }
    });
  }
}
