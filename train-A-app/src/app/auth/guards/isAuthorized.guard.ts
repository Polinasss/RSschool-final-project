import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectRoleFeature } from '../_state/roles.selectors';

@Injectable({
  providedIn: 'root',
})
export class IsAuthorizedGuard implements CanActivate {
  private store: Store = inject(Store);

  private router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select(selectRoleFeature).pipe(
      map((userRole) => {
        if (route.data['role'].includes(userRole)) {
          return true;
        }
        alert(`You do not have access to this page. Please register or log in`);
        this.router.navigateByUrl('/');
        return false;
      }),
    );
  }
}
