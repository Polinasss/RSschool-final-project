import { createFeature, createReducer, on } from '@ngrx/store';
import { orderActions } from './order.action';
import { OrderState, initialOrderState } from './order.state';

export const orderFeature = createFeature({
  name: 'order',
  reducer: createReducer<OrderState>(
    initialOrderState,
    on(
      orderActions.loadAllOrder,
      (state): OrderState => ({
        ...state,
        isLoading: true,
      }),
    ),
    on(
      orderActions.loadAllOrderSuccess,
      (state, { order }): OrderState => ({
        ...state,
        order: [...order],
        isLoading: false,
      }),
    ),
    on(
      orderActions.loadAllOrderFailure,
      (state, { error }): OrderState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
    on(
      orderActions.deleteOrderInStore,
      (state, { id }): OrderState => ({
        ...state,
        order: [...state.order.filter((item) => item.id !== id)],
        error: null,
      }),
    ),
    on(
      orderActions.deleteOrderFailure,
      (state, { error }): OrderState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
  ),
});
