import { Routes } from '@angular/router';
import { SigninComponent } from './login/pages/login/signin.component';
import { SigninGuard } from './login/guards/signin.guard';
import { SignupPageComponent } from './auth/pages/signup-page/signup-page.component';

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [SigninGuard],
  },
  { path: 'signup', component: SignupPageComponent },
];
