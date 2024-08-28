import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/layout.routers').then((m) => m.layoutRoutes),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
