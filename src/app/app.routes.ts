import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Main_Page',
    loadComponent: () => import('./pages/main-page/main-page.component').then(c => c.MainPageComponent),

  },




  {
    path: '',
    title: '',
    loadComponent: () => import('./pages/main-page/main-page.component').then(c => c.MainPageComponent),

  },

];
