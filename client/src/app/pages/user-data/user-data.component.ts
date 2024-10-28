import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { GetAlbumCommand } from '@commands/get-album.command';
import { GetTrackCommand } from '@commands/get-track.command';
import { AlbumDataRepository } from '@repository/album-data.repository';
import { TrackDataRepository } from '@repository/track-data.repository';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export default class UserDataComponent  {
  private getTrackCommand: GetTrackCommand = inject(GetTrackCommand);
  private getAlbumCommand: GetAlbumCommand = inject(GetAlbumCommand);

  private trackRepository: TrackDataRepository = inject(TrackDataRepository);
  private albumRepository: AlbumDataRepository = inject(AlbumDataRepository);

  public trackData = computed(() => this.trackRepository.getTrackData());
  public albumData = computed(() => this.albumRepository.getAlbumData());

  constructor() {
    this.getTrackCommand.getTrack('5bDol0wPoQlIgLWzP8tbkW');
    // this.getAlbumCommand.getAlbum('1DQf6E6KdekVzfw8D25T93?si=qPoghWQaRyOEuaz7KdWfMw');
  }
}
