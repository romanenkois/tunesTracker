import { Component } from '@angular/core';
import { UserTopArtistsComponent } from "../../widgets/user-top-artists/user-top-artists.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserTopArtistsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

}
