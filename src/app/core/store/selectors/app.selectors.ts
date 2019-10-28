import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromApp from '../reducers/app.reducer';

const selectAppState = createFeatureSelector<fromApp.State>(
  fromApp.appFeatureKey
);

export const selectIsLoading = createSelector(
  selectAppState,
  state => state.loading
);

export const selectError = createSelector(
  selectAppState,
  state => state.err
);
