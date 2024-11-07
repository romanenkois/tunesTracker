import { Component, input, InputSignal } from '@angular/core';
import { fadeAnimation } from '@animation/fade.animation';
import { Track } from '@entity/index';

@Component({
  selector: 'app-track-card',
  standalone: true,
  imports: [],
  templateUrl: './track-card.component.html',
  styleUrl: './track-card.component.scss',
  animations: [
    fadeAnimation
  ]
})
export class TrackCardComponent {
  track: InputSignal<Track> = input.required();
  index: InputSignal<number> = input.required();
}
