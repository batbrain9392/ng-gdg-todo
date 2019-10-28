import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '../models/todo.model';
import * as todoActions from '../actions/todo.actions';

export const todoFeatureKey = 'todos';

export interface State extends EntityState<Todo> {}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = adapter.getInitialState({});

const todoReducer = createReducer(
  initialState,
  on(todoActions.loadTodosSuccess, (state, action) =>
    adapter.addAll(action.todos, state)
  ),
  on(todoActions.upsertTodoSuccess, (state, action) =>
    adapter.upsertOne(action.todo, state)
  ),
  on(todoActions.deleteTodoSuccess, (state, action) =>
    adapter.removeOne(action.todoId, state)
  ),
  on(todoActions.clearTodosSuccess, state => adapter.removeAll(state))
);

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}

export const {
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
