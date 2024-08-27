import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TripState } from './search.state';
import { searchFeature } from './search.reducer';
import { searchActions } from './search.action';

@Injectable({ providedIn: 'root' })
export class TripFacade {
  private readonly store = inject<Store<TripState>>(Store);

  readonly trip$ = this.store.select(searchFeature.selectTrip);

  readonly error$ = this.store.select(searchFeature.selectError);

  readonly isLoading$ = this.store.select(searchFeature.selectIsLoading);

  loadTrip(params: { [param: string]: number | string }) {
    this.store.dispatch(searchActions.loadTrip(params));
  }
}
