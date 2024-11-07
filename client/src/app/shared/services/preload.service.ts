import { Injectable } from '@angular/core';
import { UserDataRepository } from '@repository/user-data.repository';


@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  constructor(private userDataRepository: UserDataRepository) {
    this.loadUserDataFromSessionStorage();
  }

  loadUserDataFromSessionStorage() {
    // console.log('прелоадінг');

    const userCode = sessionStorage.getItem('userCode');
    if (userCode) {
      this.userDataRepository.setUserCode(userCode);
    }
  }
}

