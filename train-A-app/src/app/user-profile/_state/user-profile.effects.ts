import { Injectable, inject } from '@angular/core';
import { exhaustMap, map, catchError, of, mergeMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from 'app/core/services/notification/notification.service';
import { UserProfileService } from '../services/user-profile.service';
import { userProfileActions } from './user-profile.actions';
import { UserProfile } from '../models/user-profile';

@Injectable()
export class UserProfileEffects {
  private readonly actions$ = inject(Actions);

  private readonly userService = inject(UserProfileService);

  private readonly notificationService = inject(NotificationService);

  getUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userProfileActions.loadUserProfile),
      exhaustMap(() =>
        this.userService.loadUserProfile().pipe(
          map((user: UserProfile) => {
            return userProfileActions.loadUserProfileSuccess({ user });
          }),
          catchError((error) => of(userProfileActions.loadUserProfileFailure({ error }))),
        ),
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userProfileActions.updateUserProfile),
      mergeMap((action) =>
        this.userService.updateUserProfile(action.user).pipe(
          map((responseUser) =>
            userProfileActions.updateUserProfileSuccess({
              user: responseUser,
            }),
          ),
          catchError((error) => of(userProfileActions.updateUserProfileFailure({ error }))),
        ),
      ),
    );
  });

  updateUserInStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userProfileActions.updateUserProfileSuccess),
      mergeMap((action) => {
        return of(userProfileActions.updateUserProfileInStore({ user: action.user }));
      }),
    );
  });

  updateUserPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userProfileActions.updateUserProfilePassword),
      mergeMap((action) =>
        this.userService.updateUserPassword(action.password).pipe(
          tap(() => this.notificationService.openSuccessSnackBar('Password changed successfully!')),
          map(() => userProfileActions.updateUserProfilePasswordSuccess()),
          catchError((error) => of(userProfileActions.updateUserProfilePasswordFailure({ error }))),
        ),
      ),
    );
  });

  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userProfileActions.logoutUserProfile),
      mergeMap(() =>
        this.userService.logoutUserProfile().pipe(
          map(() => userProfileActions.logoutUserProfileSuccess()),
          catchError((error) => of(userProfileActions.logoutUserProfileFailure({ error }))),
        ),
      ),
    );
  });

  deleteUserInStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userProfileActions.logoutUserProfileSuccess),
      mergeMap(() => {
        localStorage.removeItem('token');
        return of(userProfileActions.deleteUserProfileInStore());
      }),
    );
  });
}
