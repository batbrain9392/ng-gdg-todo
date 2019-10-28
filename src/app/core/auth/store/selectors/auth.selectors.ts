import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTodo from '../reducers/auth.reducer';

const getTodoState = createFeatureSelector<fromTodo.State>(
  fromTodo.authFeatureKey
);

// export const getAllTodos = createSelector(
//   getTodoState,
//   fromTodo.selectAll
// );

// export const getTotalTodos = createSelector(
//   getTodoState,
//   fromTodo.selectTotal
// );
