import { Component, inject, WritableSignal, signal, computed } from '@angular/core';
import { GetUserTopItemsCommand } from '@commands/get-user-top-items.command';
import { TimeFrame } from '@entity/index';
import { TimeframeSelectionComponent } from '@feature/timeframe-selection/timeframe-selection.component';
import { UserTopItemsDataRepository } from '@repository/user-top-items.repository';

@Component({
  selector: 'app-user-top-albums',
  standalone: true,
  imports: [TimeframeSelectionComponent],
  templateUrl: './user-top-albums.component.html',
  styleUrl: './user-top-albums.component.scss'
})
export class UserTopAlbumsComponent {
  private getUserTopItems: GetUserTopItemsCommand = inject(GetUserTopItemsCommand);
  private userTopItemsRepository: UserTopItemsDataRepository = inject(UserTopItemsDataRepository);

  userTopAlbums = computed(() => this.userTopItemsRepository.getUserTopAlbums());

  periodOfTime: WritableSignal<TimeFrame> = signal('short_term');

  changeTimeFrame(timeFrame: TimeFrame) {
    if (this.periodOfTime() === timeFrame) {
      return;
    }
    this.periodOfTime.set(timeFrame);

    this.userTopItemsRepository.setUserTopAlbums([]);
    this.getUserTopItems.getUserTopAlbums(this.periodOfTime());
  }

  constructor() {
    this.getUserTopItems.getUserTopAlbums(this.periodOfTime());
  }
}
