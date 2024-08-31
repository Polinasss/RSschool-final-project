/* eslint-disable @ngrx/prefer-selector-in-select */
/* eslint-disable @ngrx/no-typed-global-store */

import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoleService } from 'app/auth/services/role.service';
import { rolesListActions } from 'app/auth/_state/roles.actions';
import { initialState } from 'app/auth/_state/roles.reducer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  public isAdmin: boolean = false;

  public isClient: boolean = false;

  public isGuest: boolean = false;

  private roleService = inject(RoleService);

  public role$: Observable<string> = this.store.select('roleState');

  public role: string = initialState;

  constructor(private store: Store<{ roleState: string }>) {
    this.role$ = this.store.select('roleState');
  }

  ngOnInit(): void {
    this.roleService.isAuthorized().subscribe((val) => {
      this.store.dispatch(rolesListActions.changeRole({ role: val }));
    });
    this.role$.subscribe((role) => {
      this.role = role;
      console.log(this.role);

      this.isAdmin = role.toLocaleLowerCase().includes('manager');
      this.isClient = role.toLocaleLowerCase().includes('user');
      this.isGuest = role.toLocaleLowerCase().includes('guest');
      console.log(this.isGuest);
    });
  }
}
