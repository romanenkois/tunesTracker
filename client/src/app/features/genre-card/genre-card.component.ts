import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-genre-card',
  standalone: true,
  imports: [],
  templateUrl: './genre-card.component.html',
  styleUrl: './genre-card.component.scss'
})
export class GenreCardComponent {
  genre: InputSignal<any> = input.required();
  index: InputSignal<number> = input.required();
}
