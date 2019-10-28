import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTodo from '../reducers/todo.reducer';

const selectTodoState = createFeatureSelector<fromTodo.State>(
  fromTodo.todoFeatureKey
);

export const selectAllTodos = createSelector(
  selectTodoState,
  fromTodo.selectAll
);

export const selectTotalTodos = createSelector(
  selectTodoState,
  fromTodo.selectTotal
);
