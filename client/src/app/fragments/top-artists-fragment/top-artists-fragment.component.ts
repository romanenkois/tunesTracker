import { Component } from '@angular/core';
import { UserTopItemsComponent } from "@widget/user-top-items/user-top-items.component";

@Component({
  selector: 'app-top-artists-fragment',
  standalone: true,
  imports: [ UserTopItemsComponent],
  templateUrl: './top-artists-fragment.component.html',
  styleUrl: './top-artists-fragment.component.scss'
})
export default class TopArtistsFragmentComponent {

}
