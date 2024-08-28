import { Injectable, inject } from '@angular/core';
import { exhaustMap, map, catchError, of, mergeMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StationService } from 'app/admin-overview/services/station/station.service';
import { Station } from 'app/admin-overview/models/station';
import { stationActions } from './station.action';

@Injectable()
export class StationEffects {
  private readonly actions$ = inject(Actions);

  private readonly stationService = inject(StationService);

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
          map((responseId) =>
            stationActions.createNewStationSuccess({
              id: responseId,
              station: action.station,
            }),
          ),
          catchError((error) => of(stationActions.createNewStationFailure({ error }))),
        ),
      ),
    );
  });

  addItemToStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(stationActions.createNewStationSuccess),
      mergeMap((action) => {
        const newItem: Station = { ...action.station, id: action.id };
        return of(stationActions.addNewStationToStore({ newStation: newItem }));
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
        return of(stationActions.deleteStationInStore({ id: action.id }));
      }),
    );
  });
}
