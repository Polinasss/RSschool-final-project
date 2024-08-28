/* eslint-disable @ngrx/prefer-selector-in-select */

import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class IsAuthorizedGuard implements CanActivate {
  private store: Store<{ roleState: string }> = inject(Store);

  private router: Router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.store.select('roleState').pipe(
      map((userRole) => {
        if (route.data['role'].includes(userRole)) {
          return true;
        }
        alert(`you cant access this page`);
        this.router.navigateByUrl('/');
        return false;
      }),
    );
  }
}
