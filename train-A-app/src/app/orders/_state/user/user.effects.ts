import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable, inject } from '@angular/core';
import { User } from 'app/orders/models/user';
import { OrderService } from 'app/orders/services/order.service';
import { exhaustMap, map, catchError, of } from 'rxjs';
import { userActions } from './user.action';

@Injectable()
export class UserEffects {
  private readonly actions$ = inject(Actions);

  private readonly orderService = inject(OrderService);

  getUserList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.loadAllUser),
      exhaustMap(() =>
        this.orderService.loadUsers().pipe(
          map((user: User[]) => userActions.loadAllUserSuccess({ user })),
          catchError((error) => of(userActions.loadAllUserFailure({ error }))),
        ),
      ),
    );
  });
}
