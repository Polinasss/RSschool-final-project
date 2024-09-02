import { createFeature, createReducer, on } from '@ngrx/store';
import { initialUserProfile, UserProfileState } from './user-profile.state';
import { userProfileActions } from './user-profile.actions';

export const userProfileFeature = createFeature({
  name: 'user',
  reducer: createReducer<UserProfileState>(
    initialUserProfile,
    on(
      userProfileActions.loadUserProfile,
      (state): UserProfileState => ({
        ...state,
      }),
    ),
    on(
      userProfileActions.loadUserProfileSuccess,
      (state, { user }): UserProfileState => ({
        ...state,
        user,
      }),
    ),
    on(
      userProfileActions.loadUserProfileFailure,
      (state, { error }): UserProfileState => ({
        ...state,
        error: error.message,
      }),
    ),
    on(
      userProfileActions.updateUserProfileInStore,
      (state, { user }): UserProfileState => ({
        ...state,
        user,
        error: null,
      }),
    ),
    on(
      userProfileActions.updateUserProfileFailure,
      (state, { error }): UserProfileState => ({
        ...state,
        error: error.message,
      }),
    ),
    on(
      userProfileActions.updateUserProfilePassword,
      (state): UserProfileState => ({
        ...state,
      }),
    ),
    on(
      userProfileActions.updateUserProfilePasswordSuccess,
      (state): UserProfileState => ({
        ...state,
      }),
    ),
    on(
      userProfileActions.updateUserProfilePasswordFailure,
      (state, { error }): UserProfileState => ({
        ...state,
        error: error.message,
      }),
    ),
    on(
      userProfileActions.deleteUserProfileInStore,
      (state): UserProfileState => ({
        ...state,
        user: { name: '', email: '', role: '' },
        error: null,
      }),
    ),
    on(
      userProfileActions.logoutUserProfileFailure,
      (state, { error }): UserProfileState => ({
        ...state,
        error: error.message,
      }),
    ),
  ),
});
