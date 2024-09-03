import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { initialState } from 'app/auth/_state/roles.reducer';
import { selectRoleFeature } from 'app/auth/_state/roles.selectors';

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

  public role$: Observable<string> = this.store.select(selectRoleFeature);

  public role: string = initialState;

  constructor(private store: Store) {
    this.role$ = this.store.select(selectRoleFeature);
  }

  ngOnInit(): void {
    this.role$.subscribe((role) => {
      this.role = role;
      this.isAdmin = role.toLocaleLowerCase().includes('manager');
      this.isClient = role.toLocaleLowerCase().includes('user');
      this.isGuest = role.toLocaleLowerCase().includes('guest');
    });
  }
}
