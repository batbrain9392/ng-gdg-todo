import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTodo from '../reducers/todo.reducer';

const selectTodoState = createFeatureSelector<fromTodo.State>(fromTodo.key);

export const selectIsLoading = createSelector(
  selectTodoState,
  state => state.loading
);

export const selectErr = createSelector(
  selectTodoState,
  state => state.err
);

export const selectAllTodos = createSelector(
  selectTodoState,
  fromTodo.selectAll
);

export const selectTotalTodos = createSelector(
  selectTodoState,
  fromTodo.selectTotal
);
