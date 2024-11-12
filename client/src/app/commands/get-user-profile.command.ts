import { inject, Injectable } from "@angular/core";
import { UserDataRepository } from "@repository/user-data.repository";
import { ApiService } from "@service/api.service";

@Injectable({ providedIn: 'root' })
export class GetUserProfileCommand {
  private apiService: ApiService = inject(ApiService);
  private userDataRepository: UserDataRepository = inject(UserDataRepository);

  public getUserProfile() {
    this.apiService.getUserProfile(this.userDataRepository.getUserCode()).subscribe((response: any) => {
      if (response) {
        this.userDataRepository.setUserProfile(response);
      } else {
        console.error('Error retrieving user profile:', response);
      }
    });
  }
}
