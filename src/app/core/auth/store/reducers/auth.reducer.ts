import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../models/auth.model';
import * as fromActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  loading: boolean;
  err: string;
  user: User | null;
}

export const initialState: State = {
  loading: false,
  err: null,
  user: null
};

const authReducer = createReducer(
  initialState,
  on(fromActions.signin, (state, action) => ({
    ...state,
    loading: true,
    err: null
  })),
  on(fromActions.signinSuccess, (state, action) => ({
    user: action.user,
    loading: false,
    err: null
  })),
  on(fromActions.signinError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  })),
  on(fromActions.signup, (state, action) => ({
    ...state,
    loading: true,
    err: null
  })),
  on(fromActions.signupSuccess, (state, action) => ({
    user: null,
    loading: false,
    err: null
  })),
  on(fromActions.signupError, (state, action) => ({
    ...state,
    loading: false,
    err: action.err
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
