import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ServerError } from 'app/shared/models/error';
import { UserProfile, UserProfileBody, UserProfilePasswordBody } from '../models/user-profile';

export const userProfileActions = createActionGroup({
  source: 'USER',
  events: {
    loadUserProfile: emptyProps(),
    loadUserProfileSuccess: props<{ user: UserProfile }>(),
    loadUserProfileFailure: props<{ error: ServerError }>(),
    updateUserProfile: props<{ user: UserProfileBody }>(),
    updateUserProfileSuccess: props<{ user: UserProfile }>(),
    updateUserProfileFailure: props<{ error: ServerError }>(),
    updateUserProfileInStore: props<{ user: UserProfile }>(),
    updateUserProfilePassword: props<{ password: UserProfilePasswordBody }>(),
    updateUserProfilePasswordSuccess: emptyProps(),
    updateUserProfilePasswordFailure: props<{ error: ServerError }>(),
    logoutUserProfile: emptyProps(),
    logoutUserProfileSuccess: emptyProps(),
    logoutUserProfileFailure: props<{ error: ServerError }>(),
    deleteUserProfileInStore: emptyProps(),
  },
});
