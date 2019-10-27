import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, concatMap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as fromActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signup),
      concatMap(({ user }) =>
        this.authService.signup(user).pipe(
          map(() => fromActions.signupSuccess()),
          catchError(err => of(fromActions.signupError({ err })))
        )
      )
    )
  );

  signin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.signin),
      concatMap(({ user }) =>
        this.authService.signin(user).pipe(
          map(userReceived =>
            fromActions.signinSuccess({ user: userReceived })
          ),
          catchError(err => of(fromActions.signinError({ err })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
