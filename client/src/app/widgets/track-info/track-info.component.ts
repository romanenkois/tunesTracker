import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, InputSignal, OnInit } from '@angular/core';
import { GetTrackCommand } from '@commands/get-track.command';
import { config } from '@config/config';
import { TrackDataRepository } from '@repository/track-data.repository';

@Component({
  selector: 'app-track-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-info.component.html',
  styleUrl: './track-info.component.scss',
})
export class TrackInfoComponent implements OnInit {
  getTrackCommand: GetTrackCommand = inject(GetTrackCommand);
  trackRepository: TrackDataRepository = inject(TrackDataRepository);

  trackId: InputSignal<string> = input.required();

  track = computed(() => this.trackRepository.getTrackData());

  baseUrl: string = `${config.BASE_CLIENT_URL}`;

  ngOnInit() {
    if (this.trackId() != '') {
      this.getTrackCommand.getTrack(this.trackId());
    }
  }
}
