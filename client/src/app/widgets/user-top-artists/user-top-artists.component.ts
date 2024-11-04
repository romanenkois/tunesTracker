import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { ArtistDTO } from '@dto/artist.dto';
import { UserDataRepository } from '@repository/user-data.repository';
import { ApiService } from '@service/api.service';

@Component({
  selector: 'app-user-top-artists',
  standalone: true,
  imports: [],
  templateUrl: './user-top-artists.component.html',
  styleUrl: './user-top-artists.component.scss'
})
export class UserTopArtistsComponent {
  private api: ApiService = inject(ApiService);

  private userDataRepository: UserDataRepository = inject(UserDataRepository);
  private code: string = this.userDataRepository.getUserCode();

  page: WritableSignal<number> = signal(1);
  pageSize: number = 10;

  userTopArtists: Array<ArtistDTO> = [];

  pageNumberDecrease() {
    if (this.page() === 1) {
      return;
    }
    this.page.update(page => page - 1);
  }
  pageNumberIncrease() {
    this.page.update(page => page + 1);
  }

  constructor() {
    effect(() => {
      this.api.getUserTopItems(
        this.code, 'artists',
        'short_term', this.pageSize,
        (this.page()-1)*this.pageSize
      ).subscribe(res => {
        console.log('res', res);

        if (res.items.length === 0) {
          this.pageNumberDecrease();
          return;
        }

        this.userTopArtists = res.items;
      })
    })
  }
}
