import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '../models/todo.model';
import * as todoActions from '../actions/todo.actions';

export const key = 'todo';

export interface State extends EntityState<Todo> {
  loading: boolean;
  err: string;
}

const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

const initialState: State = adapter.getInitialState({
  loading: false,
  err: null
});

const todoReducer = createReducer(
  initialState,
  on(todoActions.loadTodos, (state, action) => ({
    ...state,
    loading: true
  })),
  on(todoActions.loadTodosSuccess, (state, action) => ({
    ...state,
    ...adapter.addAll(action.todos, state),
    loading: false
  })),
  on(todoActions.loadTodosError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(todoActions.upsertTodo, (state, action) => ({
    ...state,
    loading: true
  })),
  on(todoActions.upsertTodoSuccess, (state, action) => ({
    ...state,
    ...adapter.upsertOne(action.todo, state),
    loading: false
  })),
  on(todoActions.upsertTodoError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(todoActions.deleteTodo, (state, action) => ({
    ...state,
    loading: true
  })),
  on(todoActions.deleteTodoSuccess, (state, action) => ({
    ...state,
    ...adapter.removeOne(action.todoId, state),
    loading: false
  })),
  on(todoActions.deleteTodoError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(todoActions.clearTodos, (state, action) => ({
    ...state,
    loading: true
  })),
  on(todoActions.clearTodosSuccess, (state, action) => ({
    ...state,
    ...adapter.removeAll(state),
    loading: false
  })),
  on(todoActions.clearTodosError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(todoActions.todosErrorClear, (state, action) => ({
    ...state,
    err: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}

export const {
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
