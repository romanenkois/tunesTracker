import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BottomNavComponent } from "@widget/bottom-nav/bottom-nav.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, BottomNavComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

}
