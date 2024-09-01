import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { userProfileActions } from './user-profile.actions';
import { UserProfileBody } from '../models/user-profile';
import { UserProfileState } from './user-profile.state';
import { userProfileFeature } from './user-profile.reducer';

@Injectable({ providedIn: 'root' })
export class UserProfileFacade {
  private readonly store = inject<Store<UserProfileState>>(Store);

  readonly user$ = this.store.select(userProfileFeature.selectUser);

  readonly error$ = this.store.select(userProfileFeature.selectError);

  loadUserProfile() {
    this.store.dispatch(userProfileActions.loadUserProfile());
  }

  updateUserProfile(updateUser: UserProfileBody) {
    this.store.dispatch(userProfileActions.updateUserProfile({ user: updateUser }));
  }

  logoutUserProfile() {
    this.store.dispatch(userProfileActions.logoutUserProfile());
  }
}
