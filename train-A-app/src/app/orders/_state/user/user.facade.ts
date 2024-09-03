import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { userActions } from './user.action';
import { userFeature } from './user.reducer';
import { UserState } from './user.state';

@Injectable({ providedIn: 'root' })
export class UserFacade {
  private readonly store = inject<Store<UserState>>(Store);

  readonly user$ = this.store.select(userFeature.selectUser);

  readonly error$ = this.store.select(userFeature.selectError);

  loadUser() {
    this.store.dispatch(userActions.loadAllUser());
  }
}
