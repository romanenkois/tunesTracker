import { inject, Injectable } from '@angular/core';
import { AudioFeaturesDTO } from '@dto/audio-features.dto';
import { AudioFeaturesMapper } from '@mapper/audio-features.mapper';
import { AudioFeaturesDataRepository } from '@repository/audio-features.repository';
import { ApiService } from '@service/index';

@Injectable({
  providedIn: 'root'
})
export class GetAudioFeaturesCommand {
  private apiService: ApiService = inject(ApiService);
  private audioFeatures: AudioFeaturesDataRepository = inject(AudioFeaturesDataRepository);


  public getAudioFeatures(id: string) {
    return console.error('Audio features enpoint has been depricated by Spotify');

    // this.apiService.getAudioFeatures(id).subscribe((response: AudioFeaturesDTO) => {
    //   if (response && response.id !== undefined) {
    //     this.audioFeatures.setAudioFeaturesData(AudioFeaturesMapper.toEntity(response));
    //   } else {
    //     console.error('Error retrieving audio features:', response);
    //   }
    // });
  }
}
