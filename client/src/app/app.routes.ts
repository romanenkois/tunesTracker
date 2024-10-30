import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user-data',
    loadComponent: () => import('./pages/user-data/user-data.component')
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/authorization/authorization.component')
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
