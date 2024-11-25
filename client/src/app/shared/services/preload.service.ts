import { Injectable } from '@angular/core';
import { UserDataRepository } from '@repository/user-data.repository';
import { ApiService } from '@service/api.service';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  constructor(private userDataRepository: UserDataRepository, private apiService: ApiService) {
    this.loadUserDataFromSessionStorage();
  }


  loadUserDataFromSessionStorage() {
    const userCode = localStorage.getItem('userCode');
    if (userCode) {
      this.userDataRepository.setUserCode(userCode);

    } // probably it shoud do sm to else????????????????
  }
}

