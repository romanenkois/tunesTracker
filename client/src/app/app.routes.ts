import { Routes } from '@angular/router';
import { authorizationGuard } from './shared/guards/authorization-guard.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
    canActivate: [ authorizationGuard ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component')
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
