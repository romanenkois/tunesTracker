import { Component } from '@angular/core';
import { UserTopItemsComponent } from "@widget/user-top-items/user-top-items.component";

@Component({
  selector: 'app-top-albums-fragment',
  standalone: true,
  imports: [UserTopItemsComponent],
  templateUrl: './top-albums-fragment.component.html',
  styleUrl: './top-albums-fragment.component.scss'
})
export default class TopAlbumsFragmentComponent {

}
