import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'medications',
    loadComponent: () => import('./medication-list/medication-list.page').then( m => m.MedicationListPage)
  },
  {
    path: 'calendar',
    loadComponent: () => import('./calendar/calendar.page').then( m => m.CalendarPage)
  },
];
