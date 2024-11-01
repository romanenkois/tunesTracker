import { Routes } from '@angular/router';
import { authorizationGuard } from './authorization-guard.guard';

export const routes: Routes = [
  {
    path: 'user-data',
    loadComponent: () => import('./pages/user-data/user-data.component'),
    canActivate: [ authorizationGuard ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/authorization/authorization.component')
  },
  {
    path: 'test',
    loadComponent: () => import('./pages/test-page/test-page.component')
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
