import { createFeature, createReducer, on } from '@ngrx/store';
import { initialRideState, RideState } from './ride.state';
import { rideActions } from './ride.action';

export const rideFeature = createFeature({
  name: 'ride',
  reducer: createReducer<RideState>(
    initialRideState,
    on(
      rideActions.loadRideById,
      (state): RideState => ({
        ...state,
        isLoading: true,
      }),
    ),
    on(
      rideActions.loadRideByIdSuccess,
      (state, { ride }): RideState => ({
        ...state,
        ride,
        isLoading: false,
      }),
    ),
    on(
      rideActions.loadRideByIdFailure,
      (state, { error }): RideState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
    on(
      rideActions.addNewRideToStore,
      (state, { newRide }): RideState => ({
        ...state,
        ride: { ...newRide },
        error: null,
      }),
    ),
    on(
      rideActions.createNewRideFailure,
      (state, { error }): RideState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
    on(
      rideActions.updateRideInStore,
      (state, { updateRide }): RideState => ({
        ...state,
        ride: updateRide,
        error: null,
      }),
    ),
    on(
      rideActions.updateRideFailure,
      (state, { error }): RideState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
    on(
      rideActions.deleteRideFromStore,
      (state): RideState => ({
        ...state,
        ride: null,
        error: null,
      }),
    ),
    on(
      rideActions.deleteRideFailure,
      (state, { error }): RideState => ({
        ...state,
        error: error.message,
        isLoading: false,
      }),
    ),
  ),
});
