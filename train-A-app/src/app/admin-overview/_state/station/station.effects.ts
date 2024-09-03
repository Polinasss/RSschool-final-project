import { Injectable, inject } from '@angular/core';
import { exhaustMap, map, catchError, of, mergeMap, take } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StationService } from 'app/admin-overview/services/station/station.service';
import { Station } from 'app/admin-overview/models/station';
import { Store } from '@ngrx/store';
import { stationActions } from './station.action';
import { stationFeature } from './station.reducer';
import { StationState } from './station.state';

@Injectable()
export class StationEffects {
  private readonly actions$ = inject(Actions);

  private readonly stationService = inject(StationService);

  private readonly store = inject<Store<StationState>>(Store);

  getStationList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(stationActions.loadAllStation),
      exhaustMap(() =>
        this.stationService.loadStation().pipe(
          map((station: Station[]) => stationActions.loadAllStationSuccess({ station })),
          catchError((error) => of(stationActions.loadAllStationFailure({ error }))),
        ),
      ),
    );
  });

  createItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(stationActions.createNewStation),
      mergeMap((action) =>
        this.stationService.addStation(action.station).pipe(
          map((response) => {
            const connectedTo = action.station.relations.map((relationId) => ({ id: relationId }));

            const newStation = {
              city: action.station.city,
              latitude: action.station.latitude,
              longitude: action.station.longitude,
              connectedTo,
            };
            return stationActions.createNewStationSuccess({
              id: response.id,
              station: newStation,
            });
          }),
          catchError((error) => of(stationActions.createNewStationFailure({ error }))),
        ),
      ),
    );
  });

  addItemToStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(stationActions.createNewStationSuccess),
      mergeMap((action) => {
        const newStation = { id: action.id, ...action.station };
        const addNewStationAction = stationActions.addNewStationToStore({ newStation });
        const updateConnectedStationsActions = action.station.connectedTo.map((relatedStation) =>
          stationActions.updateStoreAfterAdd({
            stationId: relatedStation.id,
            connectedStationId: newStation.id,
          }),
        );

        return of(addNewStationAction, ...updateConnectedStationsActions);
      }),
    );
  });

  deleteItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(stationActions.deleteStation),
      mergeMap((action) =>
        this.stationService.deleteStation(action.id).pipe(
          map(() =>
            stationActions.deleteStationSuccess({
              id: action.id,
            }),
          ),
          catchError((error) => of(stationActions.deleteStationFailure({ error }))),
        ),
      ),
    );
  });

  deleteItemInStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(stationActions.deleteStationSuccess),
      mergeMap((action) => {
        return this.store.select(stationFeature.selectStation).pipe(
          take(1),
          mergeMap((stations) => {
            const updatedStations = stations.map((station) => {
              if (station.connectedTo.some((conn) => conn.id === action.id)) {
                return {
                  ...station,
                  connectedTo: station.connectedTo.filter((conn) => conn.id !== action.id),
                };
              }
              return station;
            });

            return of(
              stationActions.deleteStationInStore({ stations: updatedStations }),
              stationActions.updateStoreAfterDelete({ id: action.id }),
            );
          }),
        );
      }),
    );
  });
}
