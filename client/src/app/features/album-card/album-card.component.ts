import { Component, input, InputSignal } from '@angular/core';
import { fadeAnimation } from '@animation/fade.animation';
import { Album } from '@entity/album.entity';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss',
  animations: [
    fadeAnimation
  ]
})
export class AlbumCardComponent {
  album: InputSignal<Album> = input.required();
  index: InputSignal<number> = input.required();
}
