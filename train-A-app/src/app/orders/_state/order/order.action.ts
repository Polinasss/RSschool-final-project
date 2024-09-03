import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ServerError } from 'app/shared/models/error';
import { Order } from '../../models/order';

export const orderActions = createActionGroup({
  source: 'ORDER',
  events: {
    loadAllOrder: emptyProps(),
    loadAllOrderSuccess: props<{ order: Order[] }>(),
    loadAllOrderFailure: props<{ error: ServerError }>(),
    deleteOrder: props<{ id: number }>(),
    deleteOrderSuccess: props<{ id: number }>(),
    deleteOrderFailure: props<{ error: ServerError }>(),
    deleteOrderInStore: props<{ id: number }>(),
  },
});
