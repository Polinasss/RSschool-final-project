import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRoleFeature = createFeatureSelector<{ roleState: string }>('roleState');
export const selectRoleState = createSelector(selectRoleFeature, (state) => state.roleState);
