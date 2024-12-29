import { Component, computed, inject, input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { GetUserTopItemsCommand } from '@commands/get-user-top-items.command';
import { LoadMoreButtonComponent } from "@feature/load-more-button/load-more-button.component";
import { TimeframeSelectionComponent } from "@feature/timeframe-selection/timeframe-selection.component";
import { TimeFrame } from '@entity/shared.entity';
import { UserTopItemsDataRepository } from '@repository/user-top-items.repository';
import { CommonModule } from '@angular/common';
import { CardStandartFullsizeComponent } from "../../features/card-standart-fullsize/card-standart-fullsize.component";
import { CardMapper } from '@mapper/card.mapper';

@Component({
  selector: 'app-user-top-items',
  standalone: true,
  imports: [CommonModule, LoadMoreButtonComponent, TimeframeSelectionComponent, CardStandartFullsizeComponent],
  templateUrl: './user-top-items.component.html',
  styleUrl: './user-top-items.component.scss'
})
export class UserTopItemsComponent implements OnInit {
  private userTopItemsDataRepository: UserTopItemsDataRepository = inject(UserTopItemsDataRepository);
  private getUserTopItems: GetUserTopItemsCommand = inject(GetUserTopItemsCommand);

  itemType: InputSignal<'tracks' | 'artists' | 'albums'> = input.required();

  periodOfTime: WritableSignal<TimeFrame> = signal('short_term' as TimeFrame);

  userTopItems = computed(() => {
    switch (this.itemType()) {
      case 'tracks':
        return this.userTopItemsDataRepository.getUserTopTracks(this.periodOfTime()).map(track => CardMapper.toEntity(track));;
      case 'albums':
        return this.userTopItemsDataRepository.getUserTopAlbums(this.periodOfTime()).map(album => CardMapper.toEntity(album));
      case 'artists':
        return this.userTopItemsDataRepository.getUserTopArtists(this.periodOfTime()).map(artist => CardMapper.toEntity(artist));
      default:
        return [];
    }
  });

  loadMoreItems() {
    let type = this.itemType();
    if (type != 'albums') {
      this.getUserTopItems.getMoreUserTopItems(type, this.periodOfTime(), this.userTopItems().length);
    }
  }

  changeTimeFrame(timeFrame: TimeFrame) {
    if (this.periodOfTime() === timeFrame) {
      return;
    }
    this.periodOfTime.set(timeFrame);

    let type = this.itemType();
    if (type != 'albums') {
      this.getUserTopItems.getUserTopItems(type, this.periodOfTime());
    } else {
      this.getUserTopItems.getUserTopAlbums(this.periodOfTime(), 40);
    }
  }

  ngOnInit() {
    let type = this.itemType();
    switch (type) {
      case 'tracks':
        if (this.userTopItemsDataRepository.getUserTopTracks(this.periodOfTime()).length === 0) {
          this.getUserTopItems.getUserTopItems('tracks', this.periodOfTime());
        }
        break;
      case 'albums':
        if (this.userTopItemsDataRepository.getUserTopAlbums(this.periodOfTime()).length === 0) {
          this.getUserTopItems.getUserTopAlbums(this.periodOfTime(), 40);
        }
        break;
      case 'artists':
        if (this.userTopItemsDataRepository.getUserTopArtists(this.periodOfTime()).length === 0) {
          this.getUserTopItems.getUserTopItems('artists', this.periodOfTime());
        }
        break;
      default:
        break;
    }
  }
}
