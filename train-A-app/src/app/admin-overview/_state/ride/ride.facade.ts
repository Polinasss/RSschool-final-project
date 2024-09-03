import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Ride, Segment } from 'app/admin-overview/models/ride';
import { RideState } from './ride.state';
import { rideFeature } from './ride.reducer';
import { rideActions } from './ride.action';

@Injectable({ providedIn: 'root' })
export class RideFacade {
  private readonly store = inject<Store<RideState>>(Store);

  readonly ride$ = this.store.select(rideFeature.selectRide);

  readonly error$ = this.store.select(rideFeature.selectError);

  readonly isLoading$ = this.store.select(rideFeature.selectIsLoading);

  loadRideById(id: number) {
    this.store.dispatch(rideActions.loadRideById({ id }));
  }

  addRide(routeId: number, newRide: Omit<Ride, 'id'>) {
    this.store.dispatch(rideActions.createNewRide({ routeId, ride: newRide }));
  }

  updateRide(routeId: number, rideId: number, updateRide: Segment[]) {
    this.store.dispatch(rideActions.updateRide({ routeId, rideId, segments: updateRide }));
  }

  deleteRide(routeId: number, rideId: number) {
    this.store.dispatch(rideActions.deleteRide({ routeId, rideId }));
  }
}
