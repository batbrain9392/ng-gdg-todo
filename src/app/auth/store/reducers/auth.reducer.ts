import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/auth.actions';
import * as fromModels from '../models/auth.model';

export const authFeatureKey = 'auth';

export interface State {
  isLoggedIn: boolean;
  user: fromModels.User | null;
}

export const initialState: State = {
  isLoggedIn: false,
  user: null
};

const authReducer = createReducer(
  initialState,
  on(fromActions.signinSuccess, (state, action) => ({
    ...state,
    isLoggedIn: true,
    user: action.user
  })),
  on(fromActions.signinError, state => ({
    ...state,
    isLoggedIn: false,
    user: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
