import { Routes } from '@angular/router';
import { SigninComponent } from './login/pages/login/signin.component';
import { SigninGuard } from './login/guards/signin.guard';

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [SigninGuard],
  },
];
