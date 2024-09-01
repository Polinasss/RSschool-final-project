import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RideService } from 'app/admin-overview/services/ride/ride.service';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Ride } from 'app/admin-overview/models/ride';
import { rideActions } from './ride.action';

@Injectable()
export class RideEffects {
  private readonly actions$ = inject(Actions);

  private readonly rideService = inject(RideService);

  getRideById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(rideActions.loadRideById),
      switchMap((action: { id: number }) =>
        this.rideService.loadRideById(action.id).pipe(
          map((ride: Ride) => rideActions.loadRideByIdSuccess({ ride })),
          catchError((error) => of(rideActions.loadRideByIdFailure({ error }))),
        ),
      ),
    );
  });

  createItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(rideActions.createNewRide),
      switchMap((action) =>
        this.rideService.addRide(action.routeId, action.ride).pipe(
          map((response) =>
            rideActions.createNewRideSuccess({
              id: response.id,
              ride: action.ride,
            }),
          ),
          catchError((error) => of(rideActions.createNewRideFailure({ error }))),
        ),
      ),
    );
  });

  addItemToStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(rideActions.createNewRideSuccess),
      switchMap((action) => {
        const newItem: Ride = { ...action.ride, id: action.id };
        return of(rideActions.addNewRideToStore({ newRide: newItem }));
      }),
    );
  });

  updateItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(rideActions.updateRide),
      mergeMap((action) =>
        this.rideService.updateRide(action.routeId, action.rideId, action.ride).pipe(
          map(() =>
            rideActions.updateRideSuccess({
              ride: action.ride,
            }),
          ),
          catchError((error) => of(rideActions.updateRideFailure({ error }))),
        ),
      ),
    );
  });

  updateItemInStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(rideActions.updateRideSuccess),
      mergeMap((action) => {
        return of(rideActions.updateRideInStore({ updateRide: action.ride }));
      }),
    );
  });

  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(rideActions.deleteRide),
      mergeMap((action) =>
        this.rideService.deleteRide(action.routeId, action.rideId).pipe(
          map(() =>
            rideActions.deleteRideSuccess({
              routeId: action.routeId,
              rideId: action.rideId,
            }),
          ),
          catchError((error) => of(rideActions.deleteRideFailure({ error }))),
        ),
      ),
    );
  });

  deleteItemFromStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(rideActions.deleteRideSuccess),
      mergeMap((action) => {
        return of(
          rideActions.deleteRideFromStore({ routeId: action.routeId, rideId: action.rideId }),
        );
      }),
    );
  });
}
