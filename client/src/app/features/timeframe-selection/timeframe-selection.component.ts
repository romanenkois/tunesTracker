import { Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { TimeFrame } from '@entity/shared.entity';

@Component({
  selector: 'app-timeframe-selection',
  standalone: true,
  imports: [],
  templateUrl: './timeframe-selection.component.html',
  styleUrl: './timeframe-selection.component.scss'
})
export class TimeframeSelectionComponent {
  timeFrameSelected: InputSignal<TimeFrame> = input.required();

  @Output() timeFrameChangeEvent = new EventEmitter<TimeFrame>();

  changeTimeFrame(timeframe: TimeFrame) {
    this.timeFrameChangeEvent.emit(timeframe);
  }
}
