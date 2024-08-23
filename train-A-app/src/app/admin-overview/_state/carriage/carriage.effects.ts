import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CarriageService } from '../../services/carriage/carriage.service';
import { carriageActions } from './carriage.action';
import { Carriage } from '../../models/carriage';

@Injectable()
export class CarriageEffects {
  private readonly actions$ = inject(Actions);

  private readonly carriageService = inject(CarriageService);

  getCarriageList$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(carriageActions.loadAllCarriage),
      exhaustMap(() =>
        this.carriageService.loadCarriage().pipe(
          map((carriage: Carriage[]) => carriageActions.loadAllCarriageSuccess({ carriage })),
          catchError((error) => of(carriageActions.loadAllCarriageFailure({ error }))),
        ),
      ),
    );
  });
}
