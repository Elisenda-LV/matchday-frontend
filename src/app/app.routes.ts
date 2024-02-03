import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Match Day',
    loadComponent: () => import('./pages/main-page/main-page.component').then(c => c.MainPageComponent),

  },
  {
    path: 'leagues',
    title: 'Leagues',
    loadComponent: () => import('./components/leagues/leagues.component').then(c => c.LeaguesComponent),

  },



  {
    path: '',
    title: '',
    loadComponent: () => import('./pages/main-page/main-page.component').then(c => c.MainPageComponent),

  },

];
