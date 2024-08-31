import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Trip } from '../models/trip';
import { searchActions } from './search.action';
import { SearchService } from '../services/search.service';

@Injectable()
export class TripEffects {
  private readonly actions$ = inject(Actions);

  private readonly searchService = inject(SearchService);

  getTrip$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.loadTrip),
      exhaustMap((params) => {
        return this.searchService.searchStations(params.params).pipe(
          map((trip: Trip) => searchActions.loadTripSuccess({ trip })),
          catchError((error) => of(searchActions.loadTripFailure({ error }))),
        );
      }),
    );
  });
}
