import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { orderFeature } from './order.reducer';
import { OrderState } from './order.state';
import { orderActions } from './order.action';

@Injectable({ providedIn: 'root' })
export class OrderFacade {
  private readonly store = inject<Store<OrderState>>(Store);

  readonly order$ = this.store.select(orderFeature.selectOrder);

  readonly error$ = this.store.select(orderFeature.selectError);

  readonly isLoading$ = this.store.select(orderFeature.selectIsLoading);

  loadOrder() {
    this.store.dispatch(orderActions.loadAllOrder());
  }

  deleteOrder(orderId: number) {
    this.store.dispatch(orderActions.deleteOrder({ id: orderId }));
  }
}
