import { createAction, props } from '@ngrx/store';
import * as fromModels from '../models/auth.model';

export const signin = createAction(
  '[Signin Page] Signin',
  props<{ user: fromModels.User }>()
);
export const signinSuccess = createAction(
  '[Signin API] Signin Success',
  props<{ user: fromModels.User }>()
);
export const signinError = createAction(
  '[Signin API] Signin Error',
  props<{ err: string }>()
);

export const signup = createAction(
  '[Signup Page] Signup',
  props<{ user: fromModels.User }>()
);
export const signupSuccess = createAction('[Signup API] Signup Success');
export const signupError = createAction(
  '[Signup API] Signup Error',
  props<{ err: string }>()
);
