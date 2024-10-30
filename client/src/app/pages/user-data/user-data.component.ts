import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GetAlbumCommand } from '@commands/get-album.command';
import { GetTrackCommand } from '@commands/get-track.command';
import { AlbumDataRepository } from '@repository/album-data.repository';
import { TrackDataRepository } from '@repository/track-data.repository';
import { UserDataRepository } from '@repository/user-data.repository';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export default class UserDataComponent  {
  private router: Router = inject(Router);

  private getTrackCommand: GetTrackCommand = inject(GetTrackCommand);
  private getAlbumCommand: GetAlbumCommand = inject(GetAlbumCommand);

  private trackRepository: TrackDataRepository = inject(TrackDataRepository);
  private albumRepository: AlbumDataRepository = inject(AlbumDataRepository);
  private userDataRepository: UserDataRepository = inject(UserDataRepository);

  public trackData = computed(() => this.trackRepository.getTrackData());
  public albumData = computed(() => this.albumRepository.getAlbumData());

  constructor() {
    let userCode: string = this.userDataRepository.getUserCode();
    if (userCode === '') {
      this.router.navigate(['/login']);
    }
    console.log(userCode);
  }
}
