import { Component } from '@angular/core';
import { UserTopArtistsComponent } from "../../widgets/user-top-artists/user-top-artists.component";

@Component({
  selector: 'app-top-artists-fragment',
  standalone: true,
  imports: [UserTopArtistsComponent],
  templateUrl: './top-artists-fragment.component.html',
  styleUrl: './top-artists-fragment.component.scss'
})
export class TopArtistsFragmentComponent {

}
