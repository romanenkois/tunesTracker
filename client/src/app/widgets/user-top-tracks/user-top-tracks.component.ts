import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { GetUserTopItemsCommand } from '@commands/get-user-top-items.command';
import { TrackCardComponent } from '@feature/track-card/track-card.component';
import { UserDataRepository } from '@repository/user-data.repository';
import { LoadMoreButtonComponent } from "@feature/load-more-button/load-more-button.component";
import { TimeframeSelectionComponent } from "@feature/timeframe-selection/timeframe-selection.component";
import { TimeFrame } from '@entity/shared.entity';

@Component({
  selector: 'app-user-top-tracks',
  standalone: true,
  imports: [TrackCardComponent, LoadMoreButtonComponent, TimeframeSelectionComponent],
  templateUrl: './user-top-tracks.component.html',
  styleUrl: './user-top-tracks.component.scss'
})
export class UserTopTracksComponent {
  private userDataRepository: UserDataRepository = inject(UserDataRepository);
  private getUserTopItems: GetUserTopItemsCommand = inject(GetUserTopItemsCommand);

  periodOfTime: WritableSignal<TimeFrame> = signal('short_term');

  userTopTracks = computed(() => this.userDataRepository.getUserTopTracks());

  loadMoreItems() {
    this.getUserTopItems.getMoreUserTopItems('tracks', this.periodOfTime(), this.userTopTracks().length);
  }

  changeTimeFrame(timeFrame: TimeFrame) {
    if (this.periodOfTime() === timeFrame) {
      return;
    }
    this.userDataRepository.setUserTopTracks([]);
    this.periodOfTime.set(timeFrame);
    this.getUserTopItems.getUserTopItems('tracks', this.periodOfTime());
  }

  constructor() {
    if (this.userDataRepository.getUserTopTracks().length === 0) {
      this.getUserTopItems.getUserTopItems('tracks', this.periodOfTime());
    }
  }
}
