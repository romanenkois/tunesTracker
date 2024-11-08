import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopNavComponent } from "@widget/top-nav/top-nav.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TopNavComponent],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
})
export class AppComponent {
  router: Router = inject(Router);

  displayTopNav: boolean = true;

  // used to stop showing the top nav pannel on login page
  constructor() {
    this.router.events.subscribe(() => {
      this.displayTopNav = this.router.url !== '/login';
    });
  }
}
