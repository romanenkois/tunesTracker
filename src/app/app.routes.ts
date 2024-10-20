import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'user-data',
        loadComponent: () => import('./pages/user-data/user-data.component')
    },
    {
        path: '',
        redirectTo: 'user-data',
        pathMatch: 'full'
    }
];
