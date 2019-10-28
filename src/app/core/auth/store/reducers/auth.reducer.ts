import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models/auth.model';
import * as fromActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null
};

const authReducer = createReducer(
  initialState,
  on(fromActions.signinSuccess, (state, action) => ({
    ...state,
    user: action.user
  })),
  on(fromActions.signinError, state => ({
    ...state,
    user: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
