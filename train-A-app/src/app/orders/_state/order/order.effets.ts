import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map, catchError, of, mergeMap } from 'rxjs';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import { orderActions } from './order.action';

@Injectable()
export class OrderEffects {
  private readonly actions$ = inject(Actions);

  private readonly orderService = inject(OrderService);

  getOrderList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActions.loadAllOrder),
      exhaustMap(() =>
        this.orderService.loadOrder().pipe(
          map((order: Order[]) => orderActions.loadAllOrderSuccess({ order })),
          catchError((error) => of(orderActions.loadAllOrderFailure({ error }))),
        ),
      ),
    );
  });

  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActions.deleteOrder),
      mergeMap((action) =>
        this.orderService.deleteOrder(action.id).pipe(
          map(() =>
            orderActions.deleteOrderSuccess({
              id: action.id,
            }),
          ),
          catchError((error) => of(orderActions.deleteOrderFailure({ error }))),
        ),
      ),
    );
  });

  deleteItemInStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActions.deleteOrderSuccess),
      mergeMap((action) => {
        return of(orderActions.deleteOrderInStore({ id: action.id }));
      }),
    );
  });
}
