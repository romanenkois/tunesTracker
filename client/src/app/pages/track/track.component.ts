import { Component, inject, OnInit } from '@angular/core';
import { TrackInfoComponent } from '../../widgets/track-info/track-info.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AudioFeaturesInfoComponent } from "../../widgets/audio-features-info/audio-features-info.component";

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [TrackInfoComponent, CommonModule, AudioFeaturesInfoComponent],
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
