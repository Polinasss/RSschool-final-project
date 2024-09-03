import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RoleService } from '../services/role.service';
import { rolesListActions } from '../_state/roles.actions';

@Injectable({
  providedIn: 'root',
})
export class IsAuthorizedGuard implements CanActivate {
  private store: Store = inject(Store);

  private router: Router = inject(Router);

  private roleService = inject(RoleService);

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.roleService.isAuthorized().pipe(
      map((role: string) => {
        this.store.dispatch(rolesListActions.changeRole({ role }));
        if (route.data['role'].includes(role)) {
          return true;
        }
        alert(`You do not have access to this page. Please register or log in`);
        this.router.navigateByUrl('/');
        return false;
      }),
    );
  }
}
