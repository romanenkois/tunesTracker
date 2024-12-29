import { Component, computed, inject } from '@angular/core';
import { GetUserProfileCommand } from '@commands/get-user-profile.command';
import { UserDataRepository } from '@repository/user-data.repository';
import { LogOutButtonComponent } from "../../features/log-out-button/log-out-button.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [LogOutButtonComponent],
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
