import { createAction, props } from '@ngrx/store';
import * as fromModels from '../models/todo.model';

export const loadTodos = createAction('[Todo API] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo API] Load Todos',
  props<{ todos: fromModels.Todo[] }>()
);
export const loadTodosError = createAction(
  '[Todo API] Load Todos Error',
  props<{ err: string }>()
);

export const upsertTodo = createAction(
  '[Todo API] Upsert Todo',
  props<{ todo: fromModels.Todo }>()
);
export const upsertTodoSuccess = createAction(
  '[Todo API] Upsert Todo',
  props<{ todo: fromModels.Todo }>()
);
export const upsertTodoError = createAction(
  '[Todo API] Upsert Todo Error',
  props<{ err: string }>()
);

export const deleteTodo = createAction(
  '[Todo API] Delete Todo',
  props<{ id: string }>()
);
export const deleteTodoSuccess = createAction(
  '[Todo API] Delete Todo',
  props<{ id: string }>()
);
export const deleteTodoError = createAction(
  '[Todo API] Delete Todo Error',
  props<{ err: string }>()
);

export const clearTodos = createAction('[Todo API] Clear Todos');
export const clearTodosSuccess = createAction('[Todo API] Clear Todos');
export const clearTodosError = createAction(
  '[Todo API] Clear Todos Error',
  props<{ err: string }>()
);
