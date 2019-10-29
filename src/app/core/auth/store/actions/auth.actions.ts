import { createAction, props } from '@ngrx/store';
import { User } from '../models/auth.model';

export const signin = createAction(
  '[Signin Page] Signin',
  props<{ user: User }>()
);
export const signinSuccess = createAction(
  '[Signin API] Signin Success',
  props<{ user: User }>()
);
export const signinError = createAction(
  '[Signin API] Signin Error',
  props<{ err: string }>()
);

export const signup = createAction(
  '[Signup Page] Signup',
  props<{ user: User }>()
);
export const signupSuccess = createAction('[Signup API] Signup Success');
export const signupError = createAction(
  '[Signup API] Signup Error',
  props<{ err: string }>()
);

export const signout = createAction('[Feature Page] Signout');
export const signoutSuccess = createAction('[Signout API] Signout Success');
export const signoutError = createAction(
  '[Signout API] Signout Error',
  props<{ err: string }>()
);

export const authErrorClear = createAction('[Auth Page] Auth Error Clear');
