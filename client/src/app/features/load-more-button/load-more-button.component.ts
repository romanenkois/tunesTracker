import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-load-more-button',
  standalone: true,
  imports: [],
  templateUrl: './load-more-button.component.html',
  styleUrl: './load-more-button.component.scss'
})
export class LoadMoreButtonComponent {
 @Output() loadMoreEvent = new EventEmitter<void>();

  loadMoreClick() {
    this.loadMoreEvent.emit();
  }
}
