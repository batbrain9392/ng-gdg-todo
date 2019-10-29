import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '../models/todo.model';
import * as todoActions from '../actions/todo.actions';

export const todoFeatureKey = 'todos';

export interface State extends EntityState<Todo> {
  loading: boolean;
  err: string;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  err: null
});

const todoReducer = createReducer(
  initialState,
  on(todoActions.loadTodos, (state, action) => ({
    ...state,
    loading: true,
    err: null
  })),
  on(todoActions.loadTodosSuccess, (state, action) => ({
    ...adapter.addAll(action.todos, state),
    loading: false,
    err: null
  })),
  on(todoActions.loadTodosError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(todoActions.upsertTodo, (state, action) => ({
    ...state,
    loading: true,
    err: null
  })),
  on(todoActions.upsertTodoSuccess, (state, action) => ({
    ...adapter.upsertOne(action.todo, state),
    loading: false,
    err: null
  })),
  on(todoActions.upsertTodoError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(todoActions.deleteTodo, (state, action) => ({
    ...state,
    loading: true,
    err: null
  })),
  on(todoActions.deleteTodoSuccess, (state, action) => ({
    ...adapter.removeOne(action.todoId, state),
    loading: false,
    err: null
  })),
  on(todoActions.deleteTodoError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(todoActions.clearTodos, (state, action) => ({
    ...state,
    loading: true,
    err: null
  })),
  on(todoActions.clearTodosSuccess, (state, action) => ({
    ...adapter.removeAll(state),
    loading: false,
    err: null
  })),
  on(todoActions.clearTodosError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
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
