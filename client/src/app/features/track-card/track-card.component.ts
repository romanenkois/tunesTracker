import { Component, input, InputSignal } from '@angular/core';
import { Track } from '@entity/index';

@Component({
  selector: 'app-track-card',
  standalone: true,
  imports: [],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss'
})
export class TrackCardComponent {
  track: InputSignal<Track> = input.required();
}
