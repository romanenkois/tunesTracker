import { Component, computed, inject, OnInit } from '@angular/core';
import { UserDataService } from '../api/user-data.service';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export default class UserDataComponent implements OnInit {
  userDataService: UserDataService = inject(UserDataService);

  trackData = computed(() => this.userDataService.trackData());

  ngOnInit() {
    
  }
}
