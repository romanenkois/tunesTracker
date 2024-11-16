import { Component, inject, WritableSignal, signal, computed } from '@angular/core';
import { GetUserTopItemsCommand } from '@commands/get-user-top-items.command';
import { config } from '@config/config';
import { TimeFrame } from '@entity/index';
import { TimeframeSelectionComponent } from '@feature/timeframe-selection/timeframe-selection.component';
import { UserTopItemsDataRepository } from '@repository/user-top-items.repository';
import { AlbumCardComponent } from "../../features/album-card/album-card.component";

@Component({
  selector: 'app-user-top-albums',
  standalone: true,
  imports: [TimeframeSelectionComponent, AlbumCardComponent],
  templateUrl: './user-top-albums.component.html',
  styleUrl: './user-top-albums.component.scss'
})
export class UserTopAlbumsComponent {
  private getUserTopItems: GetUserTopItemsCommand = inject(GetUserTopItemsCommand);
  private userTopItemsRepository: UserTopItemsDataRepository = inject(UserTopItemsDataRepository);

  userTopAlbums = computed(() => this.userTopItemsRepository.getUserTopAlbums());

  periodOfTime: WritableSignal<TimeFrame> = signal('short_term');
  itemsLimit: WritableSignal<number> = signal(40); // 40 is an optimal number, as it is only 2 req of albums data to spotify api

  changeTimeFrame(timeFrame: TimeFrame) {
    if (this.periodOfTime() === timeFrame) {
      return;
    }
    this.periodOfTime.set(timeFrame);

    this.userTopItemsRepository.setUserTopAlbums([]);
    this.getUserTopItems.getUserTopAlbums(this.periodOfTime(), this.itemsLimit());
  }

  constructor() {
    this.getUserTopItems.getUserTopAlbums(this.periodOfTime(), this.itemsLimit());
  }
}
