import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GetAlbumCommand } from '@commands/get-album.command';
import { GetTrackCommand } from '@commands/get-track.command';
import { AlbumDataRepository } from '@repository/album-data.repository';
import { TrackDataRepository } from '@repository/track-data.repository';
import { UserDataRepository } from '@repository/user-data.repository';
import { ApiService } from '@service/api.service';
import { NavigationMobileComponent } from "../../widgets/navigation-mobile/navigation-mobile.component";

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [CommonModule, NavigationMobileComponent],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export default class UserDataComponent  {
  private router: Router = inject(Router);

  private api: ApiService = inject(ApiService);

  private userDataRepository: UserDataRepository = inject(UserDataRepository);

  constructor() {
    // check if user is logged in
    let code: string = this.userDataRepository.getUserCode();
    if (code === '') {
      // this.router.navigate(['/login']);
    } else {
      console.log('user code', {code});

      // this.api.getUserccessToken(code).subscribe(res => {
      //   console.log('ac token ',res.access_token);

      //   this.api.getUserTopItemsIndirect(res.access_token, 'artists', 'short_term', 5).subscribe(res => {
      //     console.log('res', res);
      //   })

      //   // this.api.getUserTopItemsDirect(res.access_token, 'artists', 'short_term', 5).subscribe(res => {
      //   //   console.log('res', res);
      //   // })
      // })

      this.api.getUserTopItems(code, 'artists', 'short_term', 5).subscribe(res => {
        console.log('res', res);
      })
    }
  }
}
