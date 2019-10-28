import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTodo from '../reducers/auth.reducer';

const selectAuthState = createFeatureSelector<fromTodo.State>(
  fromTodo.authFeatureKey
);

export const selectUser = createSelector(
  selectAuthState,
  state => state.user
);

export const selectIsLoggedIn = createSelector(
  selectUser,
  user => !!user
);
