import { createActionGroup, props } from '@ngrx/store';
import { RolesActionsType } from './state.models';

export const rolesListActions = createActionGroup({
  source: 'roleState',
  events: {
    [RolesActionsType.change]: props<{ role: string }>(),
  },
});
