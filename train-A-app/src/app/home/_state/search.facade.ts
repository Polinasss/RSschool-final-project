import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SearchParams } from 'app/home/services/search.service';
import { TripState } from './search.state';
import { searchFeature, tripFeature } from './search.reducer';
import { searchActions, tripActions } from './search.action';
import { ChosenRide } from '../models/trip';

@Injectable({ providedIn: 'root' })
export class TripFacade {
  private readonly store = inject<Store<TripState>>(Store);

  readonly trip$ = this.store.select(searchFeature.selectTrip);

  readonly routes$ = this.store.select(searchFeature.selectRoutes);

  readonly getRoutesByDate = (date: Date) =>
    this.store.select(searchFeature.selectRoutesByStartDay(date));

  readonly availableDates$ = this.store.select(searchFeature.selectAvailableDates);

  readonly error$ = this.store.select(searchFeature.selectError);

  readonly isLoading$ = this.store.select(searchFeature.selectIsLoading);

  loadTrip(params: SearchParams) {
    this.store.dispatch(searchActions.loadTrip({ params }));
  }

  readonly ride$ = this.store.select(tripFeature.selectRide);

  saveRide(ride: ChosenRide) {
    this.store.dispatch(tripActions.saveRide({ ride }));
  }
}
