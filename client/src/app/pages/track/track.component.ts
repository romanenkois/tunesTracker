import { Component, inject, OnInit } from '@angular/core';
import { TrackInfoComponent } from '../../widgets/track-info/track-info.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [TrackInfoComponent, CommonModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss',
})
export default class TrackComponent implements OnInit {
  activeRouter: ActivatedRoute = inject(ActivatedRoute);

  trackId: string = '';

  ngOnInit() {
    this.activeRouter.url.subscribe((url) => {
      this.trackId = url[1].path;
    });
  }
}
