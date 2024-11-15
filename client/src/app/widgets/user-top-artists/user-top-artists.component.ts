import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { GetUserTopItemsCommand } from '@commands/get-user-top-items.command';
import { ArtistCardComponent } from '@feature/artist-card/artist-card.component';
import { LoadMoreButtonComponent } from "@feature/load-more-button/load-more-button.component";
import { TimeframeSelectionComponent } from "@feature/timeframe-selection/timeframe-selection.component";
import { TimeFrame } from '@entity/shared.entity';
import { UserTopItemsDataRepository } from '@repository/user-top-items.repository';

@Component({
  selector: 'app-user-top-artists',
  standalone: true,
  imports: [ArtistCardComponent, LoadMoreButtonComponent, TimeframeSelectionComponent],
  templateUrl: './user-top-artists.component.html',
  styleUrl: './user-top-artists.component.scss'
})
export class UserTopArtistsComponent {
  private userDataRepository: UserTopItemsDataRepository = inject(UserTopItemsDataRepository);
  private getUserTopItems: GetUserTopItemsCommand = inject(GetUserTopItemsCommand);

  periodOfTime: WritableSignal<TimeFrame> = signal('short_term');

  userTopArtists = computed(() => this.userDataRepository.getUserTopArtists());

  loadMoreItems() {
    this.getUserTopItems.getMoreUserTopItems('artists', this.periodOfTime(), this.userTopArtists().length);
  }

  changeTimeFrame(timeFrame: TimeFrame) {
    if (this.periodOfTime() === timeFrame) {
      return;
    }
    this.userDataRepository.setUserTopArtists([]);
    this.periodOfTime.set(timeFrame);
    this.getUserTopItems.getUserTopItems('artists', this.periodOfTime());
  }

  constructor() {
    if (this.userDataRepository.getUserTopArtists().length === 0) {
      this.getUserTopItems.getUserTopItems('artists', this.periodOfTime());
    }
  }
}
