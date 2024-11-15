import { Component } from '@angular/core';
import { UserTopAlbumsComponent } from "../../widgets/user-top-albums/user-top-albums.component";

@Component({
  selector: 'app-top-albums-fragment',
  standalone: true,
  imports: [UserTopAlbumsComponent],
  templateUrl: './top-albums-fragment.component.html',
  styleUrl: './top-albums-fragment.component.scss'
})
export default class TopAlbumsFragmentComponent {

}
