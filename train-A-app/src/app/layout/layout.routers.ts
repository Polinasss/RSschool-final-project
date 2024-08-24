import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SigninGuard } from '../login/guards/signin.guard';
import { RoleGuard } from '../guards/login.guard';

export const layoutRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
        canActivate: [SigninGuard, RoleGuard],
        data: {
          role: 'Admin, Client',
        },
      },
      {
        path: 'orders',
        loadComponent: () => import('../orders/orders.component').then((m) => m.OrdersComponent),
        canActivate: [SigninGuard, RoleGuard],
        data: {
          role: 'Admin, Client',
        },
      },
      {
        path: 'admin-page',
        loadComponent: () =>
          import('../admin-overview/pages/admin-overview-page/admin-overview-page.component').then(
            (m) => m.AdminOverviewPageComponent,
          ),
        canActivate: [SigninGuard, RoleGuard],
        data: {
          role: 'Admin',
        },
      },
    ],
  },
];
