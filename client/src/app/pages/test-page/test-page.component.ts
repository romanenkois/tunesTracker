import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { GetAlbumCommand } from '@commands/get-album.command';
import { GetArtistCommand } from '@commands/get-artist.command';
import { GetTrackCommand } from '@commands/get-track.command';
import { Artist } from '@entity/artist.entity';
import { AlbumDataRepository } from '@repository/album-data.repository';
import { TrackDataRepository } from '@repository/track-data.repository';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export default class TestPageComponent {
  private getTrackCommand: GetTrackCommand = inject(GetTrackCommand);
  private getAlbumCommand: GetAlbumCommand = inject(GetAlbumCommand);
  private getArtistCommand: GetArtistCommand = inject(GetArtistCommand);

  private trackRepository: TrackDataRepository = inject(TrackDataRepository);
  private albumRepository: AlbumDataRepository = inject(AlbumDataRepository);

  public trackData = computed(() => this.trackRepository.getTrackData());
  public albumData = computed(() => this.albumRepository.getAlbumData());

  artistsData: Array<Artist> = [];

  constructor() {
    this.getTrackCommand.getTrack('5bDol0wPoQlIgLWzP8tbkW', 'ES');

    this.getArtistCommand.returnArtists(["30F64wQIHvLiFTGaNZ73nU"]).then((res) => {
      this.artistsData = res;
    })
  }
}
