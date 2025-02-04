import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { GetAudioFeaturesCommand } from '@commands/get-audio-features.command';
import { config } from '@config/config';
import { AudioFeaturesDataRepository } from '@repository/audio-features.repository';

@Component({
  selector: 'app-audio-features-info',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './audio-features-info.component.html',
  styleUrl: './audio-features-info.component.scss'
})
export class AudioFeaturesInfoComponent {
  getAudioFeaturesCommand: GetAudioFeaturesCommand = inject(GetAudioFeaturesCommand);
  audioFeaturesRepository: AudioFeaturesDataRepository = inject(AudioFeaturesDataRepository);

  trackId: InputSignal<string> = input.required();

  audioFeatures = computed(() =>
    this.audioFeaturesRepository.getAudioFeaturesData()
  );

  baseUrl: string = `${config.BASE_CLIENT_URL}`;

  ngOnInit() {
    if (this.trackId() != '') {
      this.getAudioFeaturesCommand.getAudioFeatures(this.trackId());
    }
  }
}
