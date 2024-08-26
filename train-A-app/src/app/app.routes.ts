import { Routes } from '@angular/router';
import { SigninComponent } from './login/pages/login/signin.component';
import { SigninGuard } from './login/guards/signin.guard';
import { SignupPageComponent } from './auth/pages/signup-page/signup-page.component';
import { AdminOverviewPageComponent } from './admin-overview/pages/admin-overview-page/admin-overview-page.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [SigninGuard],
  },
  { path: 'signup', component: SignupPageComponent },
  { path: 'admin', component: AdminOverviewPageComponent },
];
