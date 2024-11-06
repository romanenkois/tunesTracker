import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { GetUserTopItemsCommand } from '@commands/get-user-top-items.command';
import { TrackCardComponent } from '@feature/track-card/track-card.component';
import { UserDataRepository } from '@repository/user-data.repository';

@Component({
  selector: 'app-user-top-tracks',
  standalone: true,
  imports: [ TrackCardComponent ],
  templateUrl: './user-top-tracks.component.html',
  styleUrl: './user-top-tracks.component.scss'
})
export class UserTopTracksComponent {
  private userDataRepository: UserDataRepository = inject(UserDataRepository);
  private getUserTopItems: GetUserTopItemsCommand = inject(GetUserTopItemsCommand);

  periodOfTime: WritableSignal<'short_term' | 'medium_term' | 'long_term'> = signal('short_term');

  userTopTracks = computed(() => this.userDataRepository.getUserTopTracks());

  loadMoreItems() {
    this.getUserTopItems.getMoreUserTopItems('tracks', this.periodOfTime(), this.userTopTracks().length);
  }

  changeTimeFrame(timeFrame: 'short_term' | 'medium_term' | 'long_term') {
    this.periodOfTime.set(timeFrame);
    this.getUserTopItems.getUserTopItems('tracks', this.periodOfTime());
  }

  constructor() {
    if (this.userDataRepository.getUserTopTracks().length === 0) {
      this.getUserTopItems.getUserTopItems('tracks', this.periodOfTime());
    }
  }
}
