import { Component } from '@angular/core';
import { UserTopItemsComponent } from "@widget/user-top-items/user-top-items.component";

@Component({
  selector: 'app-top-tracks-fragment',
  standalone: true,
  imports: [ UserTopItemsComponent],
  templateUrl: './top-tracks-fragment.component.html',
  styleUrl: './top-tracks-fragment.component.scss'
})
export default class TopTracksFragmentComponent {

}
