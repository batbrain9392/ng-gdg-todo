import { Action, createReducer, on } from '@ngrx/store';
import * as appActions from '../actions/app.actions';

export const appFeatureKey = 'app';

export interface State {
  loading: boolean;
  err: string;
}

export const initialState: State = {
  loading: false,
  err: null
};

const appReducer = createReducer(
  initialState,
  on(appActions.loadStart, state => ({
    ...state,
    loading: true,
    err: null
  })),
  on(appActions.loadEnd, state => ({
    ...state,
    loading: false,
    err: null
  })),
  on(appActions.loadEndError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
