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
    on(rideActions.loadRideByIdSuccess, (state, { ride }): RideState => {
      return { ...state, ride: { ...ride }, isLoading: false };
    }),
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
    on(rideActions.updateRideInStore, (state, { rideId, segments }): RideState => {
      if (!state.ride) {
        return {
          ...state,
          error: 'Ride data is not available',
        };
      }

      const updatedRide = {
        ...state.ride,
        schedule: state.ride.schedule.map((schedule) =>
          schedule.rideId === rideId
            ? {
                ...schedule,
                segments: [...segments],
              }
            : schedule,
        ),
      };

      return {
        ...state,
        ride: updatedRide,
        error: null,
      };
    }),
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
      (state, { rideId }): RideState => ({
        ...state,
        ride: state.ride
          ? {
              ...state.ride,
              schedule: state.ride.schedule.filter((ride) => ride.rideId !== rideId),
            }
          : null,
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
