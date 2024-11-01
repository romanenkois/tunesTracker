import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserDataRepository } from '@repository/user-data.repository';

// @Injectable({ providedIn: 'root' })
export const authorizationGuard: CanActivateFn = (route, state) => {
  let userDataRepository: UserDataRepository = inject(UserDataRepository);
  let router: Router = inject(Router);

  if (userDataRepository.getUserCode() === '') {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
