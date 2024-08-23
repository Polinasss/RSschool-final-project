import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
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

  createItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(carriageActions.createNewCarriage),
      mergeMap((action) =>
        this.carriageService.addCarriage(action.carriage).pipe(
          map((responseId) =>
            carriageActions.createNewCarriageSuccess({
              code: responseId,
              carriage: action.carriage,
            }),
          ),
          catchError((error) => of(carriageActions.createNewCarriageFailure({ error }))),
        ),
      ),
    );
  });

  addItemToStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(carriageActions.createNewCarriageSuccess),
      mergeMap((action) => {
        const newItem: Carriage = { ...action.carriage, code: action.code };
        return of(carriageActions.addNewCarriageToStore({ newCarriage: newItem }));
      }),
    );
  });

  updateItem$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(carriageActions.updateCarriage),
      mergeMap((action) =>
        this.carriageService.updateCarriage(action.carriage).pipe(
          map((responseId) =>
            carriageActions.updateCarriageSuccess({
              code: responseId,
              carriage: action.carriage,
            }),
          ),
          catchError((error) => of(carriageActions.updateCarriageFailure({ error }))),
        ),
      ),
    );
  });

  updateItemInStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(carriageActions.updateCarriageSuccess),
      mergeMap((action) => {
        const newItem: Carriage = { ...action.carriage, code: action.code };
        return of(carriageActions.updateCarriageInStore({ updateCarriage: newItem }));
      }),
    );
  });
}