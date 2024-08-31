import { Routes } from '@angular/router';
import { SigninGuard } from './auth/guards/signin.guard';
import { SignupPageComponent } from './auth/pages/signup-page/signup-page.component';
import { SigninPageComponent } from './auth/pages/signin-page/signin-page.component';
import { AdminOverviewPageComponent } from './admin-overview/pages/admin-overview-page/admin-overview-page.component';
import { RoutesPageComponent } from './admin-overview/pages/routes-page/routes-page.component';
import { RidePageComponent } from './admin-overview/pages/ride-page/ride-page.component';
import { StationsPageComponent } from './admin-overview/pages/stations-page/stations-page.component';
import { RouteListComponent } from './admin-overview/components/route-list/route-list.component';
import { CarriagesPageComponent } from './admin-overview/pages/carriages-page/carriages-page.component';
import { UserProfilePageComponent } from './user-profile/pages/user-profile-page/user-profile-page.component';

export const routes: Routes = [
  {
    path: 'signin',
    component: SigninPageComponent,
    canActivate: [SigninGuard],
  },
  { path: 'signup', component: SignupPageComponent },
  { path: 'profile', component: UserProfilePageComponent },
  {
    path: 'admin',
    component: AdminOverviewPageComponent,
    children: [
      {
        path: 'stations',
        component: StationsPageComponent,
      },
      {
        path: 'carriages',
        component: CarriagesPageComponent,
      },
      {
        path: 'routes',
        component: RoutesPageComponent,
        children: [
          { path: '', component: RouteListComponent },
          { path: ':id', component: RidePageComponent },
        ],
      },
      {
        path: '',
        redirectTo: 'stations',
        pathMatch: 'full',
      },
    ],
  },
];
