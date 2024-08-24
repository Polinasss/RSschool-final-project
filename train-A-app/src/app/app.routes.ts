import { Routes } from '@angular/router';
import { SigninComponent } from './login/pages/login/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.routers').then((m) => m.layoutRoutes),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
