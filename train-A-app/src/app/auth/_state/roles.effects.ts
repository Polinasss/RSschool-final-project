import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { rolesListActions } from './roles.actions';

@Injectable()
export class CardEffects {
  constructor(private actions$: Actions) {}

  changeRole$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(rolesListActions.changeRole),
        map((action) => {
          return action;
        }),
        catchError(() => of({ type: 'role Error' })),
      );
    },
    { dispatch: false },
  );
}
