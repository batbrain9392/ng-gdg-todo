import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as fromModels from '../models/todo.model';
import * as fromActions from '../actions/todo.actions';

export const todosFeatureKey = 'todos';

export interface State extends EntityState<fromModels.Todo> {}

export const adapter: EntityAdapter<fromModels.Todo> = createEntityAdapter<
  fromModels.Todo
>();

export const initialState: State = adapter.getInitialState({});

const todoReducer = createReducer(
  initialState,
  on(fromActions.upsertTodoSuccess, (state, action) =>
    adapter.upsertOne(action.todo, state)
  ),
  on(fromActions.deleteTodoSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(fromActions.loadTodosSuccess, (state, action) =>
    adapter.addAll(action.todos, state)
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
