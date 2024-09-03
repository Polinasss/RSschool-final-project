import { createActionGroup, props } from '@ngrx/store';
import { Ride, Segment } from 'app/admin-overview/models/ride';
import { ServerError } from '../../../shared/models/error';

export const rideActions = createActionGroup({
  source: 'RIDE',
  events: {
    loadRideById: props<{ id: number }>(),
    loadRideByIdSuccess: props<{ ride: Ride }>(),
    loadRideByIdFailure: props<{ error: ServerError }>(),
    createNewRide: props<{ routeId: number; ride: Omit<Ride, 'id'> }>(),
    createNewRideSuccess: props<{ id: number; ride: Omit<Ride, 'id'> }>(),
    createNewRideFailure: props<{ error: ServerError }>(),
    addNewRideToStore: props<{ newRide: Ride }>(),
    updateRide: props<{
      routeId: number;
      rideId: number;
      segments: Segment[];
    }>(),
    updateRideSuccess: props<{
      routeId: number;
      rideId: number;
      segments: Segment[];
    }>(),
    updateRideFailure: props<{ error: ServerError }>(),
    updateRideInStore: props<{
      routeId: number;
      rideId: number;
      segments: Segment[];
    }>(),
    deleteRide: props<{ routeId: number; rideId: number }>(),
    deleteRideSuccess: props<{ routeId: number; rideId: number }>(),
    deleteRideFailure: props<{ error: ServerError }>(),
    deleteRideFromStore: props<{ rideId: number }>(),
  },
});
