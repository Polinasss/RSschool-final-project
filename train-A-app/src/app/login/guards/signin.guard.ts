import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SigninGuard implements CanActivate {
  // TODO: get it from the service
  private isAuthenticated: boolean = false;

  public userRole = 'admin';

  private router: Router = inject(Router);

  canActivate(): boolean {
    if (this.isAuthenticated) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
