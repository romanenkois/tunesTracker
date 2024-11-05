import { Component, computed, effect, inject, signal, WritableSignal } from '@angular/core';
import { GetUserTopItemsCommand } from '@commands/get-user-top-items.command';
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
  private userDataRepository: UserDataRepository = inject(UserDataRepository);
  private getUserTopItems: GetUserTopItemsCommand = inject(GetUserTopItemsCommand);

  // page: WritableSignal<number> = signal(1);
  // pageSize: number = 15;

  periodOfTime: WritableSignal<'short_term' | 'medium_term' | 'long_term'> = signal('short_term');

  userTopArtists = computed(() => this.userDataRepository.getUserTopArtists());

  loadMoreItems() {
    this.getUserTopItems.getMoreUserTopItems('artists', this.periodOfTime(), this.userTopArtists().length);
  }

  constructor() {
    this.getUserTopItems.getUserTopItems('artists', this.periodOfTime());
  }
}
