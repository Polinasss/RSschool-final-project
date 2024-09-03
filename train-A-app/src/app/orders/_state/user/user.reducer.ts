import { createFeature, createReducer, on } from '@ngrx/store';
import { userActions } from './user.action';
import { initialUserState, UserState } from './user.state';

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer<UserState>(
    initialUserState,
    on(
      userActions.loadAllUser,
      (state): UserState => ({
        ...state,
      }),
    ),
    on(
      userActions.loadAllUserSuccess,
      (state, { user }): UserState => ({
        ...state,
        user: [...user],
      }),
    ),
    on(
      userActions.loadAllUserFailure,
      (state, { error }): UserState => ({
        ...state,
        error: error.message,
      }),
    ),
  ),
});
