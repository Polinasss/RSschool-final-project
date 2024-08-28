/* eslint-disable @ngrx/prefer-selector-in-select */
/* eslint-disable @ngrx/no-typed-global-store */

import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoleService } from 'app/guards/role.service';
import { rolesListActions } from 'app/guards/redux/roles.actions';

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

  private roleServise = inject(RoleService);

  public role$: Observable<string> = this.store.select('roleState');

  public role: string = 'null';

  constructor(private store: Store<{ roleState: string }>) {
    this.role$ = this.store.select('roleState');
  }

  ngOnInit(): void {
    this.roleServise.isAuthorized().subscribe((val) => {
      this.store.dispatch(rolesListActions.changeRole({ role: val }));
    });
    this.role$.subscribe((role) => {
      this.role = role;

      this.isAdmin = role.toLocaleLowerCase().includes('admin');
      this.isClient = role.toLocaleLowerCase().includes('user');
      this.isGuest = role.toLocaleLowerCase().includes('guest');
    });
  }
}
