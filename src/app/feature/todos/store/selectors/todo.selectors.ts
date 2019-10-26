import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTodo from '../reducers/todo.reducer';

const getTodoState = createFeatureSelector<fromTodo.State>(
  fromTodo.todoFeatureKey
);

export const getAllTodos = createSelector(
  getTodoState,
  fromTodo.selectAll
);
