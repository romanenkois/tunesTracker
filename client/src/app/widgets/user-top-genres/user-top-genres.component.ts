import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { GetUserTopItemsCommand } from '@commands/index';
import { TimeFrame } from '@entity/index';
import { UserTopItemsDataRepository } from '@repository/index';
import { TimeframeSelectionComponent } from "@feature/timeframe-selection/timeframe-selection.component";
import { GenreCardComponent } from "../../features/genre-card/genre-card.component";

@Component({
  selector: 'app-user-top-genres',
  standalone: true,
  imports: [TimeframeSelectionComponent, GenreCardComponent],
  templateUrl: './user-top-genres.component.html',
  styleUrl: './user-top-genres.component.scss'
})
export class UserTopGenresComponent {
  private getUserTopItems: GetUserTopItemsCommand = inject(GetUserTopItemsCommand);
  private userTopItemsRepository: UserTopItemsDataRepository = inject(UserTopItemsDataRepository);

  userTopGenres = computed(() => this.userTopItemsRepository.getUserTopGenres());

  periodOfTime: WritableSignal<TimeFrame> = signal('short_term');
  itemsLimit: WritableSignal<number> = signal(20); // ??????

  changeTimeFrame(timeFrame: TimeFrame) {
    if (this.periodOfTime() === timeFrame) {
      return;
    }
    this.periodOfTime.set(timeFrame);

    this.userTopItemsRepository.setUserTopGenres([]);
    this.getUserTopItems.getUserTopGenres(this.periodOfTime(), this.itemsLimit());
  }

  constructor() {
    this.getUserTopItems.getUserTopGenres(this.periodOfTime(), this.itemsLimit());
  }
}
