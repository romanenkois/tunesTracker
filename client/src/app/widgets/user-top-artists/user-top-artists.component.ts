import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { GetUserTopItemsCommand } from '@commands/get-user-top-items.command';
import { ArtistCardComponent } from '@feature/artist-card/artist-card.component';
import { UserDataRepository } from '@repository/user-data.repository';

@Component({
  selector: 'app-user-top-artists',
  standalone: true,
  imports: [ ArtistCardComponent],
  templateUrl: './user-top-artists.component.html',
  styleUrl: './user-top-artists.component.scss'
})
export class UserTopArtistsComponent {
  private userDataRepository: UserDataRepository = inject(UserDataRepository);
  private getUserTopItems: GetUserTopItemsCommand = inject(GetUserTopItemsCommand);

  periodOfTime: WritableSignal<'short_term' | 'medium_term' | 'long_term'> = signal('short_term');

  userTopArtists = computed(() => this.userDataRepository.getUserTopArtists());

  loadMoreItems() {
    this.getUserTopItems.getMoreUserTopItems('artists', this.periodOfTime(), this.userTopArtists().length);
  }

  constructor() {
    if (this.userDataRepository.getUserTopArtists().length === 0) {
      this.getUserTopItems.getUserTopItems('artists', this.periodOfTime());
    }
  }
}
