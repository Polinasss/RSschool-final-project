import { Routes } from '@angular/router';
import { SigninComponent } from './login/pages/login/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { LayoutComponent } from './layout/layout.component';
import { RoleGuard } from './guards/login.guard';
import { SigninGuard } from './login/guards/signin.guard';

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
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [SigninGuard, RoleGuard],
        data: {
          role: 'Admin, Client',
        },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        canActivate: [SigninGuard, RoleGuard],
        data: {
          role: 'Admin, Client',
        },
      },
      // Панель администатора
      // {
      //   path: 'admin-page',
      //   component: AdminComponent,
      //   canActivate: [],
      //   data: {
      //     role: 'Admin',
      //   },
      // },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
