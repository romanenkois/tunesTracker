import { Component, InputSignal, input } from '@angular/core';
import { Artist } from '@entity/artist.entity';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.scss'
})
export class ArtistCardComponent {
  artist: InputSignal<Artist> = input.required();
  index: InputSignal<number> = input.required();
}