import { Routes } from '@angular/router';
import { authorizationGuard } from './shared/guards/authorization-guard.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
    // canActivate: [ authorizationGuard ],
    children: [
      { path: 'home', loadComponent: () => import('./fragments/home-fragment/home-fragment.component') },
      { path: 'top-artists', loadComponent: () => import('./fragments/top-artists-fragment/top-artists-fragment.component') },
      { path: 'top-tracks', loadComponent: () => import('./fragments/top-tracks-fragment/top-tracks-fragment.component') },
      { path: 'top-albums', loadComponent: () => import('./fragments/top-albums-fragment/top-albums-fragment.component') },
      { path: 'top-genres', loadComponent: () => import('./fragments/top-genres-fragment/top-genres-fragment.component') },
      { path: '**', redirectTo: 'home' }
    ]
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component'),
    canActivate: [ authorizationGuard ],
  },
  // {
  //   path: 'album/:id',
  //   loadComponent: () => import('./pages/album/album.component'),
  //   canActivate: [ authorizationGuard ],
  // },
  // {
  //   path: 'artist/:id',
  //   loadComponent: () => import('./pages/artist/artist.component'),
  //   canActivate: [ authorizationGuard ],
  // },
  {
    path: 'track/:id',
    loadComponent: () => import('./pages/track/track.component'),
    canActivate: [ authorizationGuard ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component')
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];
