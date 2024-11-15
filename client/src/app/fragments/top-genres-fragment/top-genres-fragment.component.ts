import { Component } from '@angular/core';
import { UserTopGenresComponent } from "../../widgets/user-top-genres/user-top-genres.component";

@Component({
  selector: 'app-top-genres-fragment',
  standalone: true,
  imports: [UserTopGenresComponent],
  templateUrl: './top-genres-fragment.component.html',
  styleUrl: './top-genres-fragment.component.scss'
})
export default class TopGenresFragmentComponent {

}
