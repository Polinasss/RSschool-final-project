import { createFeature, createReducer, on } from '@ngrx/store';
import { rolesListActions } from './roles.actions';

export const initialState: string = 'guest';

export const rolesReducer = createFeature({
  name: 'roleState',
  reducer: createReducer(
    initialState,
    on(rolesListActions.changeRole, (state, { role }): string => role),
  ),
});
