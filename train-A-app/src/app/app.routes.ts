import { Routes } from '@angular/router';
import { SignupPageComponent } from './auth/pages/signup-page/signup-page.component';
import { SigninPageComponent } from './auth/pages/signin-page/signin-page.component';
import { AdminOverviewPageComponent } from './admin-overview/pages/admin-overview-page/admin-overview-page.component';

export const routes: Routes = [
  { path: 'signup', component: SignupPageComponent },
  { path: 'signin', component: SigninPageComponent },
  { path: 'admin', component: AdminOverviewPageComponent },
];
