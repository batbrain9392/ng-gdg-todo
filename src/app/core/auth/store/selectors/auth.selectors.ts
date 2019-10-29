import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectLoading = createSelector(
  selectAuthState,
  state => state.loading
);

export const selectErr = createSelector(
  selectAuthState,
  state => state.err
);

export const selectUser = createSelector(
  selectAuthState,
  state => state.user
);

export const selectIsLoggedIn = createSelector(
  selectUser,
  user => !!user
);
