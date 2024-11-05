import { Component } from '@angular/core';
import { UserTopTracksComponent } from "../../widgets/user-top-tracks/user-top-tracks.component";

@Component({
  selector: 'app-top-tracks-fragment',
  standalone: true,
  imports: [UserTopTracksComponent],
  templateUrl: './top-tracks-fragment.component.html',
  styleUrl: './top-tracks-fragment.component.scss'
})
export default class TopTracksFragmentComponent {

}
