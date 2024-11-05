import { Component } from '@angular/core';
import { TopTracksFragmentComponent, TopArtistsFragmentComponent, HomeFragmentComponent } from '@fragment/index';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ TopArtistsFragmentComponent, TopTracksFragmentComponent, HomeFragmentComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {

}
