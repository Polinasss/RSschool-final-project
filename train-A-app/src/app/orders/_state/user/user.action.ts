import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ServerError } from 'app/shared/models/error';
import { User } from 'app/orders/models/user';

export const userActions = createActionGroup({
  source: 'USER',
  events: {
    loadAllUser: emptyProps(),
    loadAllUserSuccess: props<{ user: User[] }>(),
    loadAllUserFailure: props<{ error: ServerError }>(),
  },
});
