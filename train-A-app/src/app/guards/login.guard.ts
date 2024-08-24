import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private router: Router = inject(Router);

  private roleService = inject(RoleService);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!route.data['role'].includes(this.roleService.userRole)) {
      this.router.navigateByUrl('/');
      alert(`your role is ${route.data['role']}`);
      return false;
    }
    return true;
  }
}
