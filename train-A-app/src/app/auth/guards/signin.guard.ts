import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SigninGuard implements CanActivate {
  private isAuthenticated: boolean = false;

  public userRole = 'manager';

  private router: Router = inject(Router);

  canActivate(): boolean {
    if (this.isAuthenticated) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
