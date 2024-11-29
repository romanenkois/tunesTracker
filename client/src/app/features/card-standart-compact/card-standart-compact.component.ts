import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { fadeAnimation } from '@animation/fade.animation';

@Component({
  selector: 'app-card-standart-compact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-standart-compact.component.html',
  styleUrl: './card-standart-compact.component.scss',
  animations: [fadeAnimation]
})
export class CardStandartCompactComponent {
  index: InputSignal<number | null> = input.required();

  data: InputSignal<{
    image?: Array<string> | string;
    primaryText?: string;
    secondaryText?: string;
    link?: string;
  }> = input.required();
}
