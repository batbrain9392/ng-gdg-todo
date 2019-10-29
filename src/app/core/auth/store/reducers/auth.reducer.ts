import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models/auth.model';
import * as fromActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: User | null;
  loading: boolean;
  err: string;
}

export const initialState: State = {
  user: null,
  loading: false,
  err: null
};

const authReducer = createReducer(
  initialState,
  on(fromActions.signin, (state, action) => ({
    ...state,
    loading: true
  })),
  on(fromActions.signinSuccess, (state, action) => ({
    user: action.user,
    loading: false
  })),
  on(fromActions.signinError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(fromActions.signup, (state, action) => ({
    ...state,
    loading: true
  })),
  on(fromActions.signupSuccess, (state, action) => ({
    user: null,
    loading: false
  })),
  on(fromActions.signupError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(fromActions.authErrorClear, (state, action) => ({
    ...state,
    err: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
