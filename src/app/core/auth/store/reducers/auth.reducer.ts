import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models/auth.model';
import * as authActions from '../actions/auth.actions';

export const key = 'auth';

export interface State {
  user: User | null;
  loading: boolean;
  err: string;
}

const initialState: State = {
  user: null,
  loading: false,
  err: null
};

const authReducer = createReducer(
  initialState,
  on(authActions.signin, (state, action) => ({
    ...state,
    loading: true
  })),
  on(authActions.signinSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false
  })),
  on(authActions.signinError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(authActions.signup, (state, action) => ({
    ...state,
    loading: true
  })),
  on(authActions.signupSuccess, (state, action) => ({
    ...state,
    loading: false
  })),
  on(authActions.signupError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(authActions.signout, (state, action) => ({
    ...state,
    loading: true
  })),
  on(authActions.signoutSuccess, (state, action) => ({
    ...initialState
  })),
  on(authActions.signoutError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(authActions.authErrorClear, (state, action) => ({
    ...state,
    err: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
