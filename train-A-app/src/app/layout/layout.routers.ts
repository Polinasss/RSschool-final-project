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
        loadComponent: () => import('../home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'profile',
        loadComponent: () => import('../profile/profile.component').then((m) => m.ProfileComponent),
        canActivate: [IsAuthorizedGuard],
        data: {
          role: ['manager', 'user'],
        },
      },
      {
        path: 'orders',
        loadComponent: () => import('../orders/orders.component').then((m) => m.OrdersComponent),
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
      },
    ],
  },
];
