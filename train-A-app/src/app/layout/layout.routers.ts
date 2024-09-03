import { Routes } from '@angular/router';
import { IsAuthorizedGuard } from 'app/auth/guards/isAuthorized.guard';
import { LayoutComponent } from './layout.component';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'signin',
        loadComponent: () =>
          import('../auth/components/signin/signin.component').then((m) => m.SigninComponent),
        canActivate: [IsAuthorizedGuard],
        data: {
          role: ['guest'],
        },
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('../auth/components/signup/signup.component').then((m) => m.SignupComponent),
        canActivate: [IsAuthorizedGuard],
        data: {
          role: ['guest'],
        },
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../home/pages/home-page/home-page.component').then((m) => m.HomePageComponent),
        canActivate: [IsAuthorizedGuard],
        data: {
          role: ['guest', 'manager', 'user'],
        },
      },
      {
        path: 'trip/:rideId',
        loadComponent: () =>
          import('../trip/components/trip/trip.component').then((m) => m.TripComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../user-profile/pages/user-profile-page/user-profile-page.component').then(
            (m) => m.UserProfilePageComponent,
          ),
        canActivate: [IsAuthorizedGuard],
        data: {
          role: ['manager', 'user'],
        },
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('../orders/pages/order-page.component').then((m) => m.OrderPageComponent),
        canActivate: [IsAuthorizedGuard],
        data: {
          role: ['manager', 'user'],
        },
      },
      {
        path: 'admin-page',
        loadComponent: () =>
          import('../admin-overview/pages/admin-overview-page/admin-overview-page.component').then(
            (m) => m.AdminOverviewPageComponent,
          ),
        canActivate: [IsAuthorizedGuard],
        data: {
          role: ['manager'],
        },
        children: [
          {
            path: 'stations',
            loadComponent: () =>
              import('../admin-overview/pages/stations-page/stations-page.component').then(
                (m) => m.StationsPageComponent,
              ),
          },
          {
            path: 'carriages',
            loadComponent: () =>
              import('../admin-overview/pages/carriages-page/carriages-page.component').then(
                (m) => m.CarriagesPageComponent,
              ),
          },
          {
            path: 'routes',
            loadComponent: () =>
              import('../admin-overview/pages/routes-page/routes-page.component').then(
                (m) => m.RoutesPageComponent,
              ),
            children: [
              {
                path: '',
                loadComponent: () =>
                  import('../admin-overview/components/route-list/route-list.component').then(
                    (m) => m.RouteListComponent,
                  ),
              },
              {
                path: ':id',
                loadComponent: () =>
                  import('../admin-overview/pages/ride-page/ride-page.component').then(
                    (m) => m.RidePageComponent,
                  ),
              },
            ],
          },
          {
            path: '',
            redirectTo: 'stations',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        redirectTo: 'admin-page',
        pathMatch: 'full',
      },
    ],
  },
];
