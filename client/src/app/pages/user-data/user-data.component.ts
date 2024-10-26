import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { DataRepository } from '@repository/data.repository';
import { GetTrackCommand } from '@commands/get-track.service';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export default class UserDataComponent  {
  private getTrackCommand: GetTrackCommand = inject(GetTrackCommand);
  private dataRepository: DataRepository = inject(DataRepository);

  public trackData = computed(() => this.dataRepository.getTrackData());

  constructor() {
    this.getTrackCommand.getTrack('5bDol0wPoQlIgLWzP8tbkW');
  }
}
