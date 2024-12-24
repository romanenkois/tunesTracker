import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { GetUserTopItemsCommand } from '@commands/get-user-top-items.command';
import { TrackCardComponent } from '@feature/track-card/track-card.component';
import { LoadMoreButtonComponent } from "@feature/load-more-button/load-more-button.component";
import { TimeframeSelectionComponent } from "@feature/timeframe-selection/timeframe-selection.component";
import { TimeFrame } from '@entity/shared.entity';
import { UserTopItemsDataRepository } from '@repository/user-top-items.repository';
import { CommonModule } from '@angular/common';
import { CardStandartCompactComponent } from "../../features/card-standart-compact/card-standart-compact.component";
import { CardStandartFullsizeComponent } from "../../features/card-standart-fullsize/card-standart-fullsize.component";

@Component({
  selector: 'app-user-top-tracks',
  standalone: true,
  imports: [CommonModule, TrackCardComponent, LoadMoreButtonComponent, TimeframeSelectionComponent, CardStandartFullsizeComponent],
  templateUrl: './user-top-tracks.component.html',
  styleUrl: './user-top-tracks.component.scss'
})
export class UserTopTracksComponent {
  private userTopItemsDataRepository: UserTopItemsDataRepository = inject(UserTopItemsDataRepository);
  private getUserTopItems: GetUserTopItemsCommand = inject(GetUserTopItemsCommand);

  periodOfTime: WritableSignal<TimeFrame> = signal('short_term' as TimeFrame);

  userTopTracks = computed(() => this.userTopItemsDataRepository.getUserTopTracks(this.periodOfTime()));

  loadMoreItems() {
    this.getUserTopItems.getMoreUserTopItems('tracks', this.periodOfTime(), this.userTopTracks().length);
  }

  changeTimeFrame(timeFrame: TimeFrame) {
    if (this.periodOfTime() === timeFrame) {
      return;
    }
    this.periodOfTime.set(timeFrame);

    this.getUserTopItems.getUserTopItems('tracks', this.periodOfTime());
  }

  constructor() {
    if (this.userTopItemsDataRepository.getUserTopTracks(this.periodOfTime()).length === 0) {
      this.getUserTopItems.getUserTopItems('tracks', this.periodOfTime());
    }
  }
}
