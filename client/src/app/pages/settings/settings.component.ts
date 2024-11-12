import { Component, computed, inject } from '@angular/core';
import { GetUserProfileCommand } from '@commands/get-user-profile.command';
import { UserDataRepository } from '@repository/user-data.repository';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export default class SettingsComponent {
  private userDataRepository: UserDataRepository = inject(UserDataRepository);
  private getUserProfileCommand: GetUserProfileCommand = inject(GetUserProfileCommand);

  userProfile = computed(() => this.userDataRepository.getUserProfile());

  constructor() {
    this.getUserProfileCommand.getUserProfile();
  }
}
