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
    path: 'teams',
    title: 'Teams',
    loadComponent: () => import('./components/teams/teams.component').then(c => c.TeamsComponent),

  },
  {
    path: 'leagues/:id',
    title: 'League Manager',
    loadComponent: () => import('./components/leagues/league-manager/league-manager.component').then(c => c.LeagueManagerComponent),

  },



  {
    path: '',
    title: '',
    loadComponent: () => import('./pages/main-page/main-page.component').then(c => c.MainPageComponent),

  },

];
