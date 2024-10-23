import { Component, computed, inject, OnInit } from '@angular/core';
import { ApiService } from 'app/data/services/api.service';
// import { ApiService } from '@service';
@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export default class UserDataComponent implements OnInit {

  private apiService: ApiService = inject(ApiService);

  ngOnInit() {
    this.apiService.getSecretToken();
    this.apiService.getTrack('5bDol0wPoQlIgLWzP8tbkW');
  }
}
