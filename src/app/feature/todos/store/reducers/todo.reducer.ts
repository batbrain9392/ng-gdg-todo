import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '../models/todo.model';
import * as fromActions from '../actions/todo.actions';

export const todoFeatureKey = 'todos';

export interface State extends EntityState<Todo> {}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: State = adapter.getInitialState({});

const todoReducer = createReducer(
  initialState,
  on(fromActions.loadTodosSuccess, (state, action) =>
    adapter.addAll(action.todos, state)
  ),
  on(fromActions.upsertTodoSuccess, (state, action) =>
    adapter.upsertOne(action.todo, state)
  ),
  on(fromActions.deleteTodoSuccess, (state, action) =>
    adapter.removeOne(action.todoId, state)
  ),
  on(fromActions.clearTodosSuccess, state => adapter.removeAll(state))
);

export function reducer(state: State | undefined, action: Action) {
  return todoReducer(state, action);
}

export const {
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
