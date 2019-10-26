import { createAction, props } from '@ngrx/store';
import { Todo } from '../models/todo.model';

export const loadTodos = createAction('[Todo API] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo API] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosError = createAction(
  '[Todo API] Load Todos Error',
  props<{ err: string }>()
);

export const upsertTodo = createAction(
  '[Todo API] Upsert Todo',
  props<{ todo: Todo }>()
);
export const upsertTodoSuccess = createAction(
  '[Todo API] Upsert Todo Success',
  props<{ todo: Todo }>()
);
export const upsertTodoError = createAction(
  '[Todo API] Upsert Todo Error',
  props<{ err: string }>()
);

export const deleteTodo = createAction(
  '[Todo API] Delete Todo',
  props<{ todoId: string }>()
);
export const deleteTodoSuccess = createAction(
  '[Todo API] Delete Todo Success',
  props<{ todoId: string }>()
);
export const deleteTodoError = createAction(
  '[Todo API] Delete Todo Error',
  props<{ err: string }>()
);

export const clearTodos = createAction('[Todo API] Clear Todos');
export const clearTodosSuccess = createAction('[Todo API] Clear Todos Success');
export const clearTodosError = createAction(
  '[Todo API] Clear Todos Error',
  props<{ err: string }>()
);
